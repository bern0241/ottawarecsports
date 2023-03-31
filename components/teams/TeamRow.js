/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
 */

import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { getImageFromS3 } from '@/utils/graphql.services';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';

export default function TeamRow({ team, setCurrentTeam }) {
	const router = useRouter();
	const [profileImage, setProfileImage] = useState('');
	const currentSeason = team.team_history[0];
	const [userName, setUserName] = useState('');
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	console.log(currentSeason);

	const getPicture = async () => {
		if (!team.team_picture)
			return setProfileImage('http://via.placeholder.com/60x60');
		const url = await getImageFromS3(team.team_picture);
		setProfileImage(url);
	};

	useEffect(() => {
		getPicture();
		if (currentSeason.captains) {
			fetchUser(currentSeason.captains[0]);
		}
	}, []);

	const fetchUser = (captainUsername) => {
		const params = {
			Username: captainUsername,
			UserPoolId: 'us-east-1_70GCK7G6t'
		}
		cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else     {
				setUserName(`${data.UserAttributes.find(o => o.Name === 'name')['Value']} ${data.UserAttributes.find(o => o.Name === 'family_name')['Value']}`);
			}          // successful response
		});
	}

	const navigateToProfile = () => {
		router.push(`/teams/${team.id}`);
		// Alternatively, we could use: team.name.replace(/\s+/g, '-').toLowerCase()
	};

	return (
		<tr
			key={team.id}
			className="border-b border-brand-neutral-300 cursor-pointer"
			onClick={navigateToProfile}
		>
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium">
				<div className="flex items-center">
					<img
						src={profileImage}
						className="rounded-full mr-5 w-[60px] h-[60px] object-cover"
					></img>
					{team.name}
				</div>
			</td>
			<td className="p-5">
				{currentSeason
					? currentSeason.captains && currentSeason.captains.map((captain, index) => (
							<span key={index}>{userName}</span>
					  ))
					: 'John Doe'}
			</td>
			<td className="p-5">{team.sports || 'Soccer'}</td>
			<td className="p-5">
				{currentSeason ? currentSeason.roster.length : 0}/15
			</td>
		</tr>
	);
}
