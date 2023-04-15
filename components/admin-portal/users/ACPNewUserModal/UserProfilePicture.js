/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES: https://stackoverflow.com/questions/6975693/amazon-s3-access-image-by-url
// https://www.youtube.com/watch?v=GsObT64SRhA&t=477s

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// import makeid from '@/utils/makeId';
//AWS Imports
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function UserProfilePicture({
	user,
	profilePic,
	setProfilePic,
	autoCenter = true,
}) {
	const bucketName = process.env.NEXT_PUBLIC_STORAGEBUCKET;
	const signedUrlExpireSeconds = 60 * 1;

	useEffect(() => {
		if (
			user &&
			user.Attributes.find((o) => o.Name === 'picture')['Value'] !== 'none'
		) {
			getImageFromS3();
		}
	}, []);

	const getImageFromS3 = () => {
		const url = s3.getSignedUrl('getObject', {
			Bucket: bucketName,
			Key: user.Attributes.find((o) => o.Name === 'picture')['Value'],
			Expires: signedUrlExpireSeconds,
		});
		setProfilePic(
			'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
		);
	};

	return (
		<div className={autoCenter ? 'w-[12rem] mx-auto' : 'w-[12rem'}>
			<label className="cursor-pointer">
				<input
					className="hidden"
					id="file"
					type="file"
					accept={'image/*'}
					onChange={(e) => setProfilePic(e.target.files[0])}
				/>

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

				<div className="absolute translate-x-[10.5rem] translate-y-[-1.5rem]">
					<ion-icon style={{ fontSize: '2rem' }} name="camera"></ion-icon>
				</div>
			</label>
		</div>
	);
}
