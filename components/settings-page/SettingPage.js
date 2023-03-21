/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import {Modal} from 'flowbite-react';
import React, { useState } from 'react';
import ChangeEmailSetup from './ChangeEmail';
import ChangePasswordSetup from './ChangePassword';
import SettingsForm from './SettingForm';
import SettingPasswordField from './SettingPasswordField';

export default function SettingsPage() {
  const [enterPasswordModal, setEnterPasswordModal] = useState(false);
  const [enterPasswordModal2, setEnterPasswordModal2] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  return(
  <div className="flex items-center">
    <SettingsForm setEnterPasswordModal={setEnterPasswordModal} setEnterPasswordModal2={setEnterPasswordModal2}/>

  {/* MODALS */}
    <div>
    {/* Email Change */}
    <Modal
      show={enterPasswordModal}
      popup={true}
      position="center"
    >
      <Modal.Body>
        <div className="flex justify-center">
          <form className="m-5">
            <p className="text-lg sm:text-2xl font-semibold my-5">
              Enter Your Password
            </p>
            <SettingPasswordField 
              id="currentPassword2"
              placeholder="Password"  
              className="sm:w-[463px] w-[360px] h-[40px]"
            />
            <div className="flex justify-center gap-3">
              <div>
                <button
                  className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
                  type="button"
                  onClick={() => 
                    setEnterPasswordModal(false)
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
                    setEmailModal(true)
                  }
                >
                  Ok
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
    <Modal
      show={emailModal}
      popup={true}
      position="center"
    >
      <Modal.Body>
        <ChangeEmailSetup setEmailModal={setEmailModal}/>
      </Modal.Body>
    </Modal>

    {/* Password Change */}
    <Modal
      show={enterPasswordModal2}
      popup={true}
      position="center"
    >
      <Modal.Body>
        <div className="flex justify-center">
          <form className="m-5">
            <p className="text-lg sm:text-2xl font-semibold my-5">
              Enter Your Password
            </p>
            <SettingPasswordField 
              id="currentPassword2"
              placeholder="Password"  
              className="sm:w-[463px] w-[360px] h-[40px]"
            />
            <div className="flex justify-center gap-3">
              <div>
                <button
                  className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
                  type="button"
                  onClick={() => 
                    setEnterPasswordModal2(false)
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
                    setPasswordModal(true)
                  }
                >
                  OK
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>

    <Modal
      show={passwordModal}
      popup={true}
      position="center"
    >
      <Modal.Body>
        <ChangePasswordSetup setPasswordModal={setPasswordModal}/>
      </Modal.Body>
    </Modal>
    </div>
  </div>
  )
}