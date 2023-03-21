/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import SettingDatePicker from './SettingDatePicker';
import SettingGenderDropDown from './SettingGenderDropDown';
import SettingLocationDropDown from './SettingLocationDropDown';
import SettingPasswordField from './SettingPasswordField';

export default function SettingsForm({setEnterPasswordModal, setEnterPasswordModal2}) {
  return(
    <>
      <form className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="firstName"
              value="First Name"
            />
          </div>
          <TextInput
            id="firstName"
            type="text"
            placeholder="First Name"
            required={true}
            className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="lastName"
              value="Last Name"
            />
          </div>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Last Name"
            required={true}
            className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor=""
              value="Birthdate"
            />
          </div>
          <SettingDatePicker/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="gender"
              value="Gender"
            />
          </div>
          <SettingGenderDropDown/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="phoneNumber"
              value="Phone Number"
            />
          </div>
          <TextInput
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
            required={true}
            className="h-[40px] xl:w--[300px]"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="location"
              value="Location"
            />
          </div>
          <SettingLocationDropDown/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email"
              value="Email"
            />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Email"
            required={true}
            className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
          />
        </div>
        <div>
          <SettingPasswordField 
            placeholder="Password"
            id="password"
            className="h-[40px] xl:w--[300px]"/>
        </div>
        <div>
          <button
            className="bg-brand-blue-800 h-[30px] w-full xl:w--[300px] rounded-[50px] text-white font-regular my-4"
            type="button"
            onClick={() => 
              setEnterPasswordModal(true)
            }
          >
            Change Email
          </button>
        </div>
        <div>
          <button
            className="bg-brand-blue-800 h-[30px] w-full xl:w--[300px] rounded-[50px] text-white font-regular my-4"
            type="button"
            onClick={() => 
              setEnterPasswordModal2(true)
            }
          >
            Change Password
          </button>
        </div>
      </form>
    </>
  )
}