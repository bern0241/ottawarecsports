/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
 */

import { useState, useEffect } from 'react';
import { getImageFromS3, uniqueByUsername } from '@/utils/graphql.services';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';
import Link from 'next/link';

export default function TeamRow({ team }) {
	const router = useRouter();
	const [profileImage, setProfileImage] = useState('');
	const [captains, setCaptains] = useState([]);

	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		getPicture();
		fetchCaptains(team.captains);
	}, []);

	const getPicture = async () => {
		if (!team.team_picture)
			return setProfileImage('/Logo.svg');
		const url = await getImageFromS3(team.team_picture);
		setProfileImage(url);
	};

	const fetchCaptains = async (myCaptains) => {
		if (myCaptains === null) {
			setCaptains([]);
			return;
		}
		setCaptains([]);
		myCaptains.forEach(async (captain) => {
			const params = {
				Username: captain,
				UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
			};
			cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					setCaptains((captains) => {
						return uniqueByUsername([...captains, data]);
					});
				}
			});
		});
	};

	const handleClickForLink = (e) => {
		e.stopPropagation();
	};

	const navigateToProfile = () => {
		router.push(`/teams/${team.id}`);
	};

	return (
		<tr
			key={team.id}
			tabIndex='0'
			onKeyDown={(e) => {
				if (e.key === ' ') {
					navigateToProfile();
				}
			}}
			className="border-b border-brand-neutral-300 cursor-pointer"
			onClick={navigateToProfile}
		>
			<td className="pl-3 py-3">
				<div className="flex flex-col min-[590px]:flex-row sm:w-[80%] items-center pl-2 gap-2">
					<img
						src={profileImage}
						className="rounded-full w-[82px] h-[82px] object-cover text-center"
						alt={`Teams profile image for ${team.name}`}
					></img>
					<p className="text-center min-[590px]:text-left ml-2 font-medium sm:w-[7rem]">
						{team.name}
					</p>
					<div className="flex-grow"></div>
				</div>
			</td>
			<td className="p-5 mx-auto">
				<ul className="text-center">
					{captains &&
						captains.map((captain, index) => (
							<li key={index}>
								<Link
									href={`/players/${captain.Username}`}
									onClick={(e) => handleClickForLink(e)}
									className="my-1 cursor-pointer text-blue-700 underline sm:w-[8rem] text-[.91rem] text-center"
								>
									{' '}
									{
										captain.UserAttributes.find((o) => o.Name === 'name')[
											'Value'
										]
									}{' '}
									{
										captain.UserAttributes.find(
											(o) => o.Name === 'family_name'
										)['Value']
									}
								</Link>
							</li>
						))}
				</ul>
			</td>
			<td className="p-3 text-center pr-4">{team.sports || 'Soccer'}</td>
			<td className="p-3 mx-auto text-center hidden sm:table-cell">
				<div className="align-middle">
					<p className="text-base">{team ? team.Players.items.length : 0}</p>
				</div>
			</td>
		</tr>
	);
}
