/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function UserProfilePictureEdit({
	teamData,
	profilePic,
	setProfilePic,
}) {
	const [defaultPic, setDefaultPic] = useState(
		'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'
	);
	const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b15402s9-dev';
	const signedUrlExpireSeconds = 60 * 1;

	useEffect(() => {
		if (teamData && !teamData.team_picture) {
			getImageFromS3();
		}
	}, []);

	const getImageFromS3 = () => {
		const url = s3.getSignedUrl('getObject', {
			Bucket: bucketName,
			Key: user.Attributes.find((o) => o.Name === 'picture')['Value'],
			Expires: signedUrlExpireSeconds,
		});
		if (user.Attributes.find((o) => o.Name === 'picture')['Value'] !== 'none') {
			setDefaultPic(url);
		}
	};

	return (
		<div className="w-[12rem] mx-auto">
			<label className="cursor-pointer">
				<input
					className="hidden"
					id="file"
					type="file"
					accept={'image/*'}
					onChange={(e) => setProfilePic(e.target.files[0])}
				/>

				{profilePic === null && (
					<img
						style={{ objectFit: 'cover' }}
						width={132}
						height={132}
						className="w-[10rem] h-[10rem] hover:opacity-80 rounded-full shadow-lg border border-black"
						src={defaultPic}
					/>
				)}

				{profilePic !== null && (
					<Image
						style={{ objectFit: 'cover' }}
						width={132}
						height={132}
						className="w-[10rem] h-[10rem] hover:opacity-80 rounded-full shadow-lg border border-black"
						src={
							profilePic
								? URL.createObjectURL(profilePic)
								: '/../public/images/image-placeholder.png'
						}
						alt="user photo"
					/>
				)}

				<div className="absolute translate-x-[10.5rem] translate-y-[-1.5rem]">
					<ion-icon style={{ fontSize: '2rem' }} name="camera"></ion-icon>
				</div>
			</label>
		</div>
	);
}
