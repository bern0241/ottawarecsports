/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { getImageFromS3 } from '@/utils/graphql.services';
import React, { useEffect, useState } from 'react';

const TeamNameAndImage = ({
	src,
	reverse,
	teamName,
}) => {
	const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getPicture();
  }, []);

  const getPicture = async () => {
		if (!src)
			return setProfileImage('http://via.placeholder.com/72x72');
		const url = await getImageFromS3(src);
		setProfileImage(url);
	};

	return (
		<>
			{reverse === true ? (
				<>
        <div className="xl:flex flex-row items-center gap-3">
					<img
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className="rounded-full border w-[72px] h-[72px]"
						src={profileImage}
					/>
					<p>{teamName}</p>
        </div>
				</>
			) : (
				<>
        <div className="flex flex-col xl:flex-row items-center gap-3">
					<p className="order-last ">{teamName}</p>
					<img
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className="rounded-full border w-[72px] h-[72px] xl:order-last"
						src={profileImage}
					/>
        </div>
				</>
			)}
		</>
	);
};

export default TeamNameAndImage;
