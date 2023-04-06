// /**
//  * Last updated: 2023-04-05
//  *
//  * Author(s):
//  * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
//  */

// import { getImageFromS3 } from '@/utils/graphql.services';
// import React, { useEffect, useState } from 'react';

// const TeamNameAndImage = ({ src, reverse, teamName }) => {
// 	const [profileImage, setProfileImage] = useState(null);

// 	useEffect(() => {
// 		getPicture();
// 	}, []);

// 	const getPicture = async () => {
// 		if (!src) return setProfileImage('http://via.placeholder.com/72x72');
// 		const url = await getImageFromS3(src);
// 		setProfileImage(url);
// 	};

// 	return (
// 		<span
// 			className={`flex flex-col md:flex-row grow items-center gap-3 justify-items-stretch`}
// 		>
// 			{reverse === true ? (
// 				<>
// 					<img
// 						style={{ objectFit: 'cover' }}
// 						width={72}
// 						height={72}
// 						className="rounded-full border w-[72px] h-[72px]"
// 						src={profileImage}
// 					/>
// 					<p className="w-12 md:w-24">{teamName || 'SuperTeam'}</p>
// 				</>
// 			) : (
// 				<>
// 					<p className="w-24 text-center md:text-left order-last md:order-none">
// 						{teamName || 'SuperTeam'}
// 					</p>
// 					<img
// 						style={{ objectFit: 'cover' }}
// 						width={72}
// 						height={72}
// 						className="rounded-full border w-[72px] h-[72px]"
// 						src={profileImage}
// 					/>
// 				</>
// 			)}
// 		</span>
// 	);
// };

// export default TeamNameAndImage;

import { useState, useEffect } from 'react';
import { getImageFromS3 } from '@/utils/graphql.services';

const TeamNameAndImage = ({ reverse, team }) => {
	const [profileImage, setProfileImage] = useState('');
	const getPicture = async () => {
		if (!team?.team_picture)
			return setProfileImage('/images/defaultProfilePic.jpeg');
		const url = await getImageFromS3(team?.team_picture);
		setProfileImage(url);
	};
	useEffect(() => {
		getPicture();
	}, []);
	return (
		<span
			className={`flex flex-col md:flex-row grow items-center gap-3 justify-items-stretch`}
		>
			{reverse === true ? (
				<>
					<img
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className="w-[4.5rem] h-[4.5rem] rounded-full border"
						src={profileImage}
					/>
					<p className="w-12 md:w-24">{team?.name || 'SuperTeam'}</p>
				</>
			) : (
				<>
					<p className="w-24 text-center md:text-left order-last md:order-none">
						{team?.name || 'SuperTeam'}
					</p>
					<img
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className=" w-[4.5rem] h-[4.5rem] rounded-full border"
						src={profileImage}
					/>
				</>
			)}
		</span>
	);
};

export default TeamNameAndImage;
