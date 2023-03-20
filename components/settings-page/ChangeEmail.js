/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import EmailVerification from './EmailVerification';
import SettingPasswordField from './SettingPasswordField';

export default function ChangeEmailSetup({setEmailModal}){
  const [verificationModal, setVerificationModal] = useState(false);

  return(
    <div className="flex justify-center">
      <form className="m-8">
        <p className="text-lg sm:text-2xl font-semibold my-5">
          Change Email
        </p>
        <div className="flex flex-col gap-5">
          <SettingPasswordField 
            id="currentPassword2"
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
            id="confirmEmail"
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
              onClick={() => 
                setEmailModal(false)
              }
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className="bg-brand-blue-800 h-[30px] w-[90px] rounded-[50px] text-white font-regular my-4"
              type="button"
              onClick={() => 
                setVerificationModal(true)
              }
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <Modal
      show={verificationModal}
      popup={true}
    >
        <Modal.Body>
          <EmailVerification setVerificationModal={setVerificationModal} />
        </Modal.Body>
      </Modal>
    </div>
  )
}