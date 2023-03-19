/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { PasswordField } from '@aws-amplify/ui-react';
import { TextInput } from 'flowbite-react';
import React from 'react';
import SettingPasswordField from './SettingPasswordField';

export default function ChangeEmail({setUiState}){
  return(
    <div className="flex justify-center">
    <div className="bg-white">
      <form className="sm:w-[463px] w-[360px] m-8">
        <p className="text-lg sm:text-2xl font-semibold my-5">
          Change Email
        </p>
        <div className="flex flex-col gap-5">
          <SettingPasswordField 
            placeholder="Enter your Password"  
            className="sm:w-[463px] w-[360px] h-[40px]"
          />
          <TextInput
            id="email"
            type="email"
            placeholder="New Email"
            required={true}  
            className="sm:w-[463px] w-[360px] h-[40px]"
          />
          <TextInput
            id="email"
            type="email"
            placeholder="Confirm Email"
            required={true}  
            className="sm:w-[463px] w-[360px] h-[40px]"
          />
        </div>
        <div className="flex justify-center gap-3">
          <div>
            <button
              className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
              type="button"
              onClick={() => setUiState('settingPage')}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className="bg-brand-blue-800 h-[30px] w-[90px] rounded-[50px] text-white font-regular my-4"
              type="button"
              onClick={() => setUiState('verification')}
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