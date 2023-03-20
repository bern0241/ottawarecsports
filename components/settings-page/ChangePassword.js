/**
* Last updated: 2023-03-19
*
* Author(s):
* Ghazaldeep Kaur <kaur0762@algonquinlive.com>
*/

import React from 'react';
import SettingPasswordField from './SettingPasswordField';

export default function ChangePasswordSetup({setPasswordModal}){
  return(
    <div className="flex justify-center">
    <div className="bg-white md:w-[463px] w-[360px]">
      <form className=" m-8">
        <p className="text-lg sm:text-2xl font-semibold my-5">
          Change Password
        </p>
        <div className="flex flex-col gap-5">
          <SettingPasswordField 
            id="currentPassword"
            placeholder="Enter your Password"  
            className="h-[40px] w-full"
          />
          <SettingPasswordField 
            id="newPassword"
            placeholder="New Password"  
            className="h-[40px] w-full"
          />
          <SettingPasswordField 
            id="confirmPassword"
            placeholder="Confirm Password"  
            className="h-[40px] w-full"
          />
        </div>
        <div className="flex justify-center gap-3">
          <div>
            <button
              className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
              type="button"
              onClick={() => 
                setPasswordModal(false)
              }
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
      </form>
    </div>
    </div>
  )
}