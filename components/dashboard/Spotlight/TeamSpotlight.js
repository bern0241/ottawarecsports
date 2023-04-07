/**
 * Last updated: 2023-04-4
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import { getAllTeams } from '@/utils/graphql.services';
import { getImageFromS3 } from '@/utils/graphql.services';
import AWS from 'aws-sdk';

export default function TeamSpotlight() {
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	const [teams, setTeams] = useState();
	const [spotlightTeam, setSpotlightTeam] = useState();
	const [profileImage, setProfileImage] = useState(null);
	const [spotlightTeamCaptain, setSpotlightTeamCaptain] = useState();

	useEffect(() => {
		getTeamsData();
	}, []);

	useEffect(() => {
		if (!teams) return;
		getRandomTeam();
	}, [teams]);

	useEffect(() => {
		if (
			!spotlightTeam ||
			!spotlightTeam.team_history ||
			!spotlightTeam.team_history[0] ||
			!spotlightTeam.team_history[0].captains ||
			spotlightTeam.team_history[0].captains.length === 0
		)
			return;

		fetchCaptain(spotlightTeam.team_history[0].captains[0]);
		getPicture();
	}, [spotlightTeam]);

	const getTeamsData = async () => {
		try {
			const response = await getAllTeams();
			setTeams(response);
		} catch (error) {
			console.error(error);
		}
	};

	const getPicture = async () => {
		if (!spotlightTeam || !spotlightTeam.team_picture)
			return setProfileImage('http://via.placeholder.com/60x60');
		const url = await getImageFromS3(spotlightTeam.team_picture);
		setProfileImage(url);
	};

	const fetchCaptain = (id) => {
		try {
			const params = {
				Username: id,
				UserPoolId: 'us-east-1_70GCK7G6t',
			};
			cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					setSpotlightTeamCaptain(
						`${data.UserAttributes.find((o) => o.Name === 'name')['Value']} ${
							data.UserAttributes.find((o) => o.Name === 'family_name')['Value']
						}`
					);
				} // successful response
			});
		} catch (error) {
			console.error(error);
		}
	};

	const getRandomTeam = () => {
		try {
			// Get a random index found in list of users:
			let randomIndex = Math.floor(Math.random() * teams.length);

			// Return random user:
			let team = teams[randomIndex];
			setSpotlightTeam(team);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-row lg:flex-col col-span-1 items-center justify-start lg:justify-center border-b lg:border-b-0 lg:border-r border-brand-neutral-300 p-8 gap-4 lg:gap-2">
			<img
				src={`${
					profileImage ? profileImage : '/images/defaultProfilePic.jpeg'
				}`}
				width="100"
				height="100"
				className="rounded-full bg-red-500 self-center mr-3 lg:mr-0 lg:mb-3 w-[100px] h-[100px] object-cover"
				alt="N/A"
			/>
			<div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Name</span>
					<span className="col-span-1 truncate">
						{spotlightTeam ? spotlightTeam.name : 'N/A'}
					</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Sport</span>
					<span className="truncate">Soccer</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Captain</span>
					<span className="truncate col-span-1">
						{spotlightTeamCaptain ? spotlightTeamCaptain : 'N/A'}
					</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Members</span>
					<span className="truncate col-span-1">
						{spotlightTeam
							? spotlightTeam.team_history[0].roster.length
							: 'N/A'}
					</span>
				</div>
			</div>
		</div>
	);
}
