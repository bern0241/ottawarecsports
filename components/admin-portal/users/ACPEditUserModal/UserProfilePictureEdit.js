/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES: https://stackoverflow.com/questions/6975693/amazon-s3-access-image-by-url

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
//AWS Imports
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function UserProfilePictureEdit({
	user,
	profilePic,
	setProfilePic,
}) {
	const [defaultPic, setDefaultPic] = useState(
		'/images/defaultProfilePic.jpeg'
	); // Default picture - on startup
	const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev'; //S3 Bucket name
	const signedUrlExpireSeconds = 60 * 1; // Expires after set time

	/**
	 * If user has valid picture, return it from backend (S3 Bucket)
	 */
	useEffect(() => {
		if (
			user &&
			user.Attributes.find((o) => o.Name === 'picture')['Value'] !== 'none'
		) {
			getImageFromS3();
		}
	}, []);

	// Retrieves user image from S3 Bucket
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
