/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listPlayers } from '@/src/graphql/queries';
import { useRouter } from 'next/router';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { getTeamShort } from '@/src/graphql/custom-queries';
import { getPlayersByUsername, getTeam } from '@/utils/graphql.services';
import AWS from 'aws-sdk';
import Link from 'next/link';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function PlayerRow({ player, index }) {
	const [profileImage, setProfileImage] = useState(null);
	const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';
	const signedUrlExpireSeconds = 60 * 1;
	const [details, setDetails] = useState();
	const [teams, setTeams] = useState([]);
	const router = useRouter();
	const [teamName, setTeamName] = useState('');

	useEffect(() => {
		setTeams([]);
		fetchTeams();

		if (
			player.Attributes.find((o) => o.Name === 'picture')['Value'] === 'none'
		) {
			setProfileImage(null);
		} else {
			const url = s3.getSignedUrl('getObject', {
				Bucket: bucketName,
				Key: player.Attributes.find((o) => o.Name === 'picture')['Value'],
				Expires: signedUrlExpireSeconds,
			});
			setProfileImage(url);
		}
	}, []);

	useEffect(() => {
		if (!index) return;
		fetchPlayer();
	}, [index]);

	useEffect(() => {
		if (details != undefined) {
			getTeamName();
		}
	}, [details]);

	// Fetch player records from Player table in database by username:
	const fetchPlayer = async () => {
		const data = await getPlayersByUsername(index);
		if (data) {
			setDetails(data[0]);
		}
	};

	// Fetch team name by id:
	const getTeamName = async () => {
		if (details.soccer_stats) {
			const teamId = details.soccer_stats[0].team;
			const data = await getTeam(teamId);
			setTeamName(data?.name);
		} else {
			setTeamName('-');
		}
	};

	// Reference: Stack Overflow/Roy <https://stackoverflow.com/questions/73598303/calculate-age-in-js-given-the-birth-date-in-dd-mm-yyyy-format>
	function calculateAge(dob) {
		const birthDate = new Date(dob);
		const currentDate = Date.now();
		const difference = currentDate - birthDate;
		// 1000 * 60 * 60 * 24 * 365 is miliseconds in a year.
		const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		return age;
	}

	// TO-DO: Do not use router. Instead, use Link.
	const handleClick = () => {
		router.push(`/players/${player.Username}`);
	};

	// Fetch player records for user by username, as well teams they play on by id:
	const fetchTeams = async () => {
		setTeams([]);
		if (!player) return;

		const variables = {
			filter: {
				user_id: {
					eq: player.Username,
				},
			},
		};
		const players = await API.graphql({
			query: listPlayers,
			variables: variables,
		});

		if (!players) {
			return;
		}

		players.data.listPlayers.items.map(async (player) => {
			if (!player.teamID) return;

			const apiData = await API.graphql({
				query: getTeamShort,
				variables: { id: player.teamID },
			});
			const data = await apiData.data.getTeam;
			setTeams((teams) => {
				return uniqueById([...teams, data]);
			});
		});
	};

	function uniqueById(items) {
		const set = new Set();
		return items.filter((item) => {
			if (!item) return;
			const isDuplicate = set.has(item.id);
			set.add(item.id);
			return !isDuplicate;
		});
	}

	// TO-DO: Implement or remove this functionality.
	const handleClickForLink = (e) => {
		e.stopPropagation();
	};

	return (
		<tr
			key={player.Username}
			className="border-b border-brand-neutral-300 hover:cursor-pointer"
			onClick={handleClick}
		>
			<td className=" sm:pl-4 py-3 text-md w-[30%]">
				<div className="flex flex-col gap-2 md:flex-row items-center mx-auto text-center">
					<img
						src={`${
							profileImage ? profileImage : '/images/defaultProfilePic.jpeg'
						}`}
						className="rounded-full text-center w-[4.5rem] h-[4.5rem] border border-gray-500 object-cover"
            alt={`Teams profile image for ${player.Attributes.find((o) => o.Name === 'name')['Value']}`}
					/>
					<div className="flex flex-col gap-1 pl-1">
						<h3 className="font-medium">
							{player.Attributes.find((o) => o.Name === 'name')['Value'].slice(
								0,
								1
							)}
							{'. '}
							{player.Attributes.find((o) => o.Name === 'family_name')['Value']}
						</h3>
						<div className="flex font-light text-left hidden md:block">
							<span className="text-sm font-medium mr-2">
								{calculateAge(
									player.Attributes.find((o) => o.Name === 'birthdate')['Value']
								)}
							</span>
							<span className="text-[.8rem]">
								{player.Attributes.find((o) => o.Name === 'gender')['Value']}
							</span>
						</div>
					</div>
				</div>
			</td>
			<td className="p-3 font-light text-center text-[.9rem]">
				{player.Attributes.find((o) => o.Name === 'custom:location')['Value']}
			</td>
			<td className="sm:pl-3 pr-3 py-3 font-light text-center text-[.9rem]">
				<p>Soccer</p>
			</td>
			<td className="sm:px-5 py-5 font-light w-full hidden sm:table-cell align-middle">
				{teams &&
					teams.map((team, index) => (
						<React.Fragment key={index}>
							<div
								key={index}
								className="flex flex-row items-center py-1 max-w-[15rem] mx-auto"
							>
								<Link onClick={(e) => handleClickForLink(e)} href={`/teams/${team.id}`} className="text-blue-700 underline text-sm text-left sm:pl-[2rem] w-[9rem]">
									{team.name}
								</Link>
								{team.captains && team.captains.includes(player.Username) && (
									<>
										<IconArrowNarrowRight
											size={'16px'}
											style={{ marginLeft: 'auto' }}
										/>
										<span className="text-sm" key={team.id}>
											{team.captains && team.captains.includes(player.Username)
												? 'Captain'
												: 'Player'}
										</span>
									</>
								)}
							</div>
						</React.Fragment>
					))}
			</td>
		</tr>
	);
}
