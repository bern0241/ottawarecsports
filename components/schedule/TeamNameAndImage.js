/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';

const TeamNameAndImage = ({
	src,
	reverse,
	teamName,
}) => {
	return (
		<span className="flex flex-row items-center gap-3">
			{reverse === true ? (
				<>
					<img
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className="rounded-full border"
						src={src}
					/>
					<p>{teamName}</p>
				</>
			) : (
				<>
					<p>{teamName}</p>
					<img
						style={{ objectFit: 'cover' }}
						width={72}
						height={72}
						className="rounded-full border"
						src={src}
					/>
				</>
			)}
		</span>
	);
};

export default TeamNameAndImage;
