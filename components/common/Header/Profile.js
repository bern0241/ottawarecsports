/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Avatar } from 'flowbite-react';
import React from 'react';

const Profile = () => {
	return (
		<div className="flex flex-wrap gap-4 p-1 mr-2">
			<div className="text-black text-right">
				<p className="font-medium text-base">Name</p>
				<p className="font-regular text-xs">Role</p>
			</div>
			<div className="">
				<Avatar
					img=""
					rounded={true}
					className="border-2 rounded-full border-brand-blue-900"
				/>
			</div>
		</div>
	);
};

export default Profile;
