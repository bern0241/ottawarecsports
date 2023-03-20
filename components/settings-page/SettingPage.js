/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import SettingsForm from '@/components/settings-page/SettingForm';
import Image from 'next/image';
import { useState } from 'react';
import { IconCameraPlus } from '@tabler/icons-react';
import { changeUserAttributes } from '@/utils/graphql.services';

export default function SettingsPage() {
	const [userAttributes, setUserAttributes] = useState({});

	const saveAttributes = async () => {
		await changeUserAttributes(userAttributes);
	};
	return (
		<>
			<div className="bg-white m-16 p-3 mt-[38rem] sm:mt-20">
				<div className="border-b border-[#c0c0c0] h-[50px] ">
					<p className="font-medium text-base self">My Profile</p>
				</div>
				<div className="flex flex-col overflow-y-scroll">
					<div className="flex justify-center">
						<div className="lg:flex lg:flex-row gap-4 m-5">
							<div>
								<div className="w-[200px] h-[200px] border rounded-full overflow-hidden">
									<Image
										src={'/images/defaultProfilePic.jpeg'}
										alt="profile pic"
										width={200}
										height={200}
										priority
									/>
								</div>
								<IconCameraPlus className="ml-40" />
							</div>
							<SettingsForm setUserAttributes={setUserAttributes} />
						</div>
					</div>
					<div className="flex justify-center">
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
					</div>
				</div>
			</div>
		</>
	);
}
