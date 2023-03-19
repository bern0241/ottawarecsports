/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import OtpField from 'react-otp-field';

export default function EmailVerification({setUiState}) {
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="bg-white">
          <form className="flex flex-col gap-2 mx-4 my-8 sm:mx-8  md:w-[470px] w-[360px]">
            <p className="font-semibold text-2xl">
              Enter Your Confirmation Code
            </p>
            <p>Enter the confirmation code that was sent to your email.</p>

            <OtpField
              numInputs={6}
              onChangeRegex={/^([0-9]{0,})$/}
              autoFocus
              separator={<span> </span>}
              inputProps={{
                className:
                  'otp-field__input w-12 h-16 border border-black rounded-md',
                disabled: false,
              }}
              classNames="flex flex-row gap-2 sm:gap-4 sm:ml-4"
            />
            <div>
              <button
                className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular mt-3"
                type="button"
              >
                Submit
              </button>
            </div>
            <div>
              <button
                className="text-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mt-3"
                type="button"
                onClick={() => setUiState('changeEmail')}
              >
                Cancel
              </button>
            </div>
            <p
              className="text-center underline cursor-pointer text-[.92rem] text-brand-blue-900"
            >
              Resend Verification Code
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
