import React from 'react';

const TeamNameAndImage = ({
	src = '/images/defaultProfilePic.jpeg',
	reverse,
	teamName = 'Super Team',
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
