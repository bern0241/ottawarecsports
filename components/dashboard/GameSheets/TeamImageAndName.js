/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Greg Coghill <cogh0020@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import { getImageFromS3 } from '@/utils/graphql.services';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const TeamImageAndName = ({ src, reverse, teamName, teamId }) => {
	const [profileImage, setProfileImage] = useState(null);

	useEffect(() => {
		getPicture();
	}, []);

	// Fetch team profile picture from storage:
	const getPicture = async () => {
		if (!src) return setProfileImage('http://via.placeholder.com/72x72');
		const url = await getImageFromS3(src);
		setProfileImage(url);
	};

	return (
		<Link href={`/teams/${teamId}`}>
			<span
				className={`flex flex-col md:flex-row grow items-center gap-3 justify-items-stretch`}
			>
				{reverse === true ? (
					<>
						<img
							style={{ objectFit: 'cover' }}
							width={72}
							height={72}
							className="rounded-full border w-[72px] h-[72px] cursor-pointer"
							src={profileImage}
							alt={`${teamName}'s profile picture`}
						/>
						<p className="w-12 md:w-24 cursor-pointer">
							{teamName || 'SuperTeam'}
						</p>
					</>
				) : (
					<>
						<p className="w-24 text-center md:text-left order-last md:order-none cursor-pointer">
							{teamName || 'SuperTeam'}
						</p>
						<img
							style={{ objectFit: 'cover' }}
							width={72}
							height={72}
							className="rounded-full border w-[72px] h-[72px] cursor-pointer"
							src={profileImage}
							alt={`${teamName}'s profile picture`}
						/>
					</>
				)}
			</span>
		</Link>
	);
};

export default TeamImageAndName;
