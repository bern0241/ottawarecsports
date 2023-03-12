/**
 * Last updated: 2023-03-11
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Image from 'next/image';
// Icons 
import { IconX } from '@tabler/icons-react';
// Components
import TextField from '../common/TextField';
import PasswordField from '../common/PasswordField';

export default function ForgotPasswordSubmitView({ email, uiState, setUiState }) {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
    }, [message])

    // Everytime the UI change to this view, reset these fields.
    useEffect(() => {
        setConfirmationCode('');
        setNewPassword('');
    }, [uiState])

    const forgotPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
            setUiState('signIn');
        } catch (error) {
            setMessage({status: 'error', message: error.message})
            console.log(error);
        }
    }

    return (
        <main className='flex'>
            <div className='h-[100vh] flex justify-center items-center px-[1rem]'>
                <form className='max-w-[33rem] py-[4rem] px-[3rem] mx-auto translate-y-[-20px]' autoComplete="off">
                        {/* Close Button */}
                        <div className='cursor-pointer absolute top-5 right-5'>
                            <IconX fontSize={'24px'} onClick={() => setUiState('signIn')} />
                        </div>
                        <div className='text-center'>
                            <Image className='m-auto' width={94} height={94} src='/../public/images/ORS-Logo.png' alt="ORS Logo"/>
                            <h1 className='text-[1.7rem] font-semibold'>Forgot Your Password? <br/>Start Here.</h1>
                        </div>
                        <div className='mt-[1.5rem]'>
                            <TextField label="Confirmation Code" 
                                    id='confirmationCode'
                                    type="hidden" 
                                    state={confirmationCode}
                                    setState={setConfirmationCode} 
                                    autoComplete={true} />

                            <PasswordField state={newPassword}
                                setState={setNewPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword} />

                            {/* Error Messaging */}
                            {message !== null && (<p id="message-notice" className={`ml-1 text-[.87rem] ${message.status === 'error' ? 'text-red-600': 'text-green-500' } relative top-1`}><span class="font-medium"></span> {message.message}</p>) }

                            {/* Signin button */}
                            <button onClick={(e) => forgotPasswordSubmit(e)} class='p-[10px] w-full bg-black text-white rounded-sm'>Submit New Password</button>
                        </div>
                </form>
            </div>
        </main>
    )
}