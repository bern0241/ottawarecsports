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
import { getImageFromS3, uniqueByUsername } from '@/utils/graphql.services';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';

export default function TeamRow({ team, setCurrentTeam }) {
	const router = useRouter();
	const [profileImage, setProfileImage] = useState('');
	// const currentSeason = team.team_history[0];
	const [captains, setCaptains] = useState([]);
	const [userName, setUserName] = useState('');

	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		getPicture();
		fetchCaptains(team.captains);
	}, []);

	const getPicture = async () => {
		if (!team.team_picture)
			return setProfileImage('http://via.placeholder.com/60x60');
		const url = await getImageFromS3(team.team_picture);
		setProfileImage(url);
	};

	const fetchCaptains = async (myCaptains) => {
		if (myCaptains === null) {
		   setCaptains([]);
		   return;
		}
		setCaptains([]);
		myCaptains.forEach(async captain => {
			const params = {
				Username: captain,
				UserPoolId: 'us-east-1_70GCK7G6t'
			}
			cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else     {
					// setCaptains(data);
					setCaptains((captains) => {
						return uniqueByUsername([...captains, data]);
					} );
					// return;
				}          
			});
		})
	}

	const goToPlayerPage = (e, captain) => {
		e.stopPropagation();
		router.push(`/players/${captain.Username}`)
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
				{captains && captains.map((captain, index) => (
                     <p className='cursor-pointer text-blue-500 underline' onClick={(e) => goToPlayerPage(e, captain)} key={index}>{captain.UserAttributes.find(o => o.Name === 'name')['Value']} {captain.UserAttributes.find(o => o.Name === 'family_name')['Value']}</p>
                 ))}
			</td>
			<td className="p-5">{team.sports || 'Soccer'}</td>
			<td className="p-5">
				<p className='text-[1.4rem]'>{team ? team.Players.items.length : 0}</p>
				
			</td>
		</tr>
	);
}
