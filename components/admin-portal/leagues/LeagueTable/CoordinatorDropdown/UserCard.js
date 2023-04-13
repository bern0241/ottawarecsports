/**
 * Last updated: 2023-04-01
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES:
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s
// https://docs.amplify.aws/lib/storage/upload/q/platform/js/

import React, { useState, useEffect } from 'react';
import { getImageFromS3 } from '@/utils/graphql.services';

export default function UserCard({ user, searchUser }) {
	const [userImage, setUserImage] = useState(null);

	// Get user image everytime the search is implied.
	useEffect(() => {
		getImage();
	}, [searchUser]);

	// Retrieves user image from the backend (S3 Bucket)
	const getImage = async () => {
		if (user.Attributes.find((o) => o.Name === 'picture')['Value'] !== 'none') {
			let url = await getImageFromS3(
				user.Attributes.find((o) => o.Name === 'picture')['Value']
			);
			setUserImage(url);
		} else {
			setUserImage(null);
		}
	};

	return (
		<div className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
			<img
				style={{ objectFit: 'cover' }}
				width={132}
				height={132}
				className="w-[3rem] h-[3rem] rounded-full shadow-md border border-black"
				src={`${userImage ? userImage : '/images/defaultProfilePic.jpeg'}`}
			/>
			<p className="text-sm">
				{user.Attributes.find((o) => o.Name === 'name')['Value']}{' '}
				{user.Attributes.find((o) => o.Name === 'family_name')['Value']}
			</p>
		</div>
	);
}
