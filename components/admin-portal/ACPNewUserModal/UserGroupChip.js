import React from 'react'
import { IconX } from '@tabler/icons-react';

export default function UserGroupChip({ name, userGroups, setUserGroups }) {
    const removeChip = (e) => {
        const arr2 = userGroups.filter(item => item !== name);
        setUserGroups(arr2);
    }

    return (
        <div className='flex justify-between gap-5 items-center'>
        <button onClick={(e) => e.stopPropagation()} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm pl-3 pr-2 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 bg-red-500">{name}
        <IconX onClick={(e) => removeChip(e)} style={{paddingLeft: '0.3rem', fontSize: '15px', transform: 'translateY(3px)' }} name="close-outline"></IconX>
        </button>
    </div>
    )
}