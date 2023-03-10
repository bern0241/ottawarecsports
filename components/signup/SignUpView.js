/**
 * Last updated: 2023-03-10
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// Components
import TextField from './TextField';
import PasswordField from './PasswordField';
import LocationDropDown from './LocationDropDown';

export default function SignUpView({ setUiState, email, setEmail }) {
    // Variable states for signing up
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    // const [currentDate, setCurrentDate] = useState({}); //Delete if not used later
    // Birthdate variables/states
    const [birthdate, setBirthdate] = useState('');
    const [birthdateProp, setBirthdateProp] = useState('');
    const [birthdateDisplay, setBirthdateDisplay] = useState('');
    // Displays Password field
    const [showPassword, setShowPassword] = useState(false);
    // Router constant used for changing pages
    const router = useRouter();

  return (
    <main className='flex'>
        <div className='h-[100vh] flex justify-center items-center px-[1rem]'>
            <div className='max-w-[33rem] py-[4rem] px-[3rem] mx-auto translate-y-[-20px]'>
                <div className='text-center'>
                    <Image onClick={() => router.push('/')} className='m-auto cursor-pointer' width={94} height={94} src='/../public/images/ORS-Logo.png' />
                    <p className='text-[1rem] mt-2 mb-3'>Create an account or <Link className='text-green-700 cursor-pointer font-bold underline italic' href="/login">Sign In</Link></p>
                </div>

                <div className='mt-[4rem]'>

                    <div className='flex gap-2'>
                        <TextField label="First Name *" 
                                    id='firstName'
                                    type="text" 
                                    state={firstName}
                                    setState={setFirstName} />
                        <TextField label="Last Name *" 
                                    id='lastName'
                                    type="text" 
                                    state={lastName}
                                    setState={setLastName} />
                    </div>
                    <div>
                        <TextField label="Email *" 
                                        id='email'
                                        type="email" 
                                        state={email}
                                        setState={setEmail} />
                        <PasswordField 
                                        state={password}
                                        setState={setPassword}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword} />
                        <TextField label="Phone Number" 
                                    id='phoneNumber'
                                    type="text" 
                                    state={phoneNumber}
                                    setState={setPhoneNumber} />
                        <LocationDropDown state={location}
                                        setState={setLocation}
                                        />
                    </div>

                </div>
            </div>
        </div>
    </main>
  )
}