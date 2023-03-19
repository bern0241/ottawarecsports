/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import SettingsForm from '@/components/settings-page/SettingForm';
import Image from 'next/image';
import React from 'react';
import {IconCameraPlus } from '@tabler/icons-react';

export default function SettingsPage({setUiState}) {
  return(
    <>
      <div className="bg-white m-16 p-3 ">
        <div className="border-b border-[#c0c0c0] h-[50px] ">
          <p className="font-medium text-base self">My Profile</p>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="flex flex-row gap-[200px] m-5 place-content-evenly">
              <div>
                <div style={{borderRadius: '100px', overflow: 'hidden'}}>
                  <Image src={"/images/defaultProfilePic.jpeg"} width={200} height={200} />
                </div>
                <IconCameraPlus className="ml-40"/>
              </div>
              <SettingsForm setUiState={setUiState} />
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
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}