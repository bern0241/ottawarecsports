import React, { useState, useEffect } from 'react';
import { getImageFromS3 } from "@/utils/graphql.services";

export default function UserCard({ user }) {
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        getImage();
    }, [])

    const getImage = async () => {
        if (user.Attributes.find(o => o.Name === 'picture')['Value'] !== 'none') {
            let url = await getImageFromS3(user.Attributes.find(o => o.Name === 'picture')['Value']);
            setUserImage(url);
        } else {
            setUserImage(null);
        }
    }

    return (
        <div class="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <img
                onClick={(e) => {
                    e.preventDefault();
                    setOpenDropdown(!openDropdown);
                }}
                style={{ objectFit: 'cover' }}
                width={132}
                height={132}
                className="w-[3rem] h-[3rem] rounded-full border border-brand-blue-900 cursor-pointer"
                src={userImage ? userImage : '/images/defaultProfilePic.jpeg'}
                alt="User Image"
            />
            <p className='text-sm'>{user.Attributes.find(o => o.Name === 'name')['Value']} {user.Attributes.find(o => o.Name === 'family_name')['Value']}</p>
        </div>
    )
}