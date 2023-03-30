/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconCameraPlus } from '@tabler/icons-react';
import Head from 'next/head';
import SettingsPage from '@/components/settings-page/SettingPage';
import { useUser } from '@/context/userContext';
import {
	changeUserAttributes,
	uploadNewImageToS3,
	deleteImageFromS3
} from '@/utils/graphql.services';
import SettingsProfileImage from '../components/settings-page/SettingsProfileImage';
import makeid from '@/utils/makeId';
import StatusMessage from '@/components/common/StatusMessage';
export default function Setting() {
	const [user] = useUser();
	const [userAttributes, setUserAttributes] = useState({});
	const [profilePic, setProfilePic] = useState('');
	const [message, setMessage] = useState(null);
	const saveAttributes = async () => {
		try {
			if (userAttributes.name === '' || userAttributes.family_name === '') {
				setMessage({status: 'error', message: "Please fillout all required fields."});
				return;
			}
			if (profilePic) {
				const imageKey = `user_${makeid(15)}`;
				// const imageKey = await uploadNewImageToS3(profilePic);
				await changeUserAttributes({
					...userAttributes,
					picture: imageKey,
				})
				if (user.attributes.picture !== 'none') {
					await deleteImageFromS3(user.attributes.picture);
				}
				await uploadNewImageToS3(imageKey, profilePic);
				setMessage({status: 'success', message: 'Profile updated successfully.'})
				return;
			}
			await changeUserAttributes({
				...userAttributes,
			});
			setMessage({status: 'success', message: 'Profile updated successfully.'})
		} catch (error) {
			setMessage({status: 'error', message: error.message});
			console.error(error);
		}
	};

	if (!user) {
		return (
			<>
				<Head>
					<title>Ottawa Rec Sports : Settings</title>
					<meta name="description" content="Generated by create next app" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/images/ORS-Logo.png" />
				</Head>
				<main>
					<div className="flex justify-center">
						<p className="text-xl font-semibold">
							You must be logged in to access this page.
						</p>
					</div>
				</main>
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Ottawa Rec Sports : Settings</title>
					<meta name="description" content="Generated by create next app" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/images/ORS-Logo.png" />
				</Head>
				<main className='mx-auto w-full m-4'>
					<div className="bg-white lg:max-w-[50em] max-w-[26em] mx-auto border-gray-500 border-[.1px] ">
						<div className="border-b border-[#c0c0c0] h-[50px] ">
							<p className="font-medium text-base self p-3 ml-3">My Profile</p>
						</div>
						<div className="flex flex-col">
							<div className="flex justify-center w-full">
								<div className="lg:flex lg:flex-row gap-4 m-5">
									<div>
										<div className="w-full h-[200px] rounded-full overflow-hidden">
												<>
													<SettingsProfileImage
														userAttributes={user.attributes}
														profilePic={profilePic}
														setProfilePic={setProfilePic}
													/>
												</>
										</div>
										<IconCameraPlus className="ml-40" />
									</div>
									<div className='flex flex-col'>

										<SettingsPage
											saveAttributes={saveAttributes}
											setUserAttributes={setUserAttributes}
										/>
										<StatusMessage message={message} setMessage={setMessage} />	
										<div className="flex justify-center mt-5 lg:mt-2">
											{/* <div>
												<button
													className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
													type="button"
												>
													Cancel
												</button>
											</div> */}
											<div>
												<button
													className="bg-brand-blue-800 h-[37px] w-[180px] rounded-[10px] text-white font-regular my-4"
													type="button"
													onClick={saveAttributes}
												>
													Save
												</button>
											</div>
										</div>

									</div>
								</div>
							</div>
							{/* <div className="flex justify-center">
								<div>
									<button
										className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
										type="button"
									>
										Cancel
									</button>
								</div>
								<div>
									<button
										className="bg-brand-blue-800 h-[30px] w-[90px] rounded-[50px] text-white font-regular my-4"
										type="button"
										onClick={saveAttributes}
									>
										Save
									</button>
								</div>
							</div> */}
						</div>
					</div>
				</main>
			</>
		);
	}
}