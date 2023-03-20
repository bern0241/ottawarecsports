import React, { useState, useEffect } from 'react'
import { Image } from '@aws-amplify/ui-react'
import { Storage } from 'aws-amplify';
import Image2 from 'next/image';
import makeid from '@/utils/makeId';
//AWS Imports
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    signatureVersion: 'v4', 
    region: 'us-east-1',
})

export default function UserProfilePicture() {
    const [userImage, setUserImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';
    const imageKey = 'pantocrator-dome.jpg';
    const signedUrlExpireSeconds = 60 * 1;

    useEffect(() => {
        getImageFromS3();
    }, [])

    const getImageFromS3 = () => {
        const url = s3.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: imageKey,
            Expires: signedUrlExpireSeconds
        })
        console.log(url);
    }

  return (
    <div className='w-[12rem] mx-auto'>
                <input className='hidden' id='file' type="file" multiple accept={"image/*"} 
                onChange={(e) => setNewImage(e.target.files[0])}/>
                <label className='cursor-pointer' for='file'>

                <Image2 style={{objectFit: 'cover'}} width={132} height={132} className="w-[10rem] h-[10rem] hover:opacity-80 rounded-full shadow-lg border border-black" src={newImage ? URL.createObjectURL(newImage) : '/../public/images/image-placeholder.png'} alt="user photo" />
            </label>
            {/* </label> */}
        <div className='absolute translate-x-[10.5rem] translate-y-[-1.5rem]'>
            <ion-icon style={{fontSize: '2rem'}} name="camera"></ion-icon>
        </div>
    </div>
  )
}