/**
 * Last updated: 2023-03-11
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';
// Components
import TextField from './TextField';
import PasswordField from './PasswordField';
import LocationDropDown from './LocationDropDown';
import GenderDropDown from './GenderDropDown';
import DatePicker from './DatePicker';

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
    // Message state for errors/succession notices
    const [message, setMessage] = useState(null);
    //Important variable for using AWS SDK Cognitio services
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    // Initialize Fields
    useEffect(() => {
        function getCurrentDate() {
            let current = new Date().toISOString().split('T')[0];
            setBirthdate(current);
        }
        getCurrentDate();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
    }, [message])

    const signUp = async () => {
        console.log('birthdate',birthdate);
        if (firstName === '' || lastName === '' || email === '' || phoneNumber === '' || location === '' || gender === '' || birthdate === '') {
            setMessage({status: 'error', message: 'Please fillout all required fields.'})
            return;
        }
        try {
            const newUser = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    name: firstName,
                    family_name: lastName,
                    'custom:location': location,
                    phone_number: phoneNumber,
                    gender: gender,
                    picture: 'none',
                    birthdate: birthdate
                }
            })
            addUserToGroup(newUser.userSub, 'User');
            setUiState('confirmSignUp');
        } catch (error) {
            console.error(error);
            setMessage({status: 'error', message: error.message});
        }
    }

    const addUserToGroup = (username, role) => {
        var params = {
            UserPoolId: 'us-east-1_Xje34Qo2X',
            GroupName: role,
            Username: username,
        };
        cognitoidentityserviceprovider.adminAddUserToGroup(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log({status: 'success', data: data})
        }
        });
    }

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
                        <div className='flex justify-between gap-2'>
                            <GenderDropDown state={gender} 
                                            setState={setGender} 
                                            />
                            <DatePicker birthdateDisplay={birthdateDisplay}/>

                        </div>
                        {/* Message that pops up when error/succession occurs */}
                        {message !== null && (<p id="message-notice" className={`ml-1 text-[.87rem] ${message.status === 'error' ? 'text-red-600': 'text-green-500' } relative top-1`}><span class="font-medium"></span> {message.message}</p>) }

                        {/* Signup button */}
                        <button type='submit' onClick={() => signUp()} className='mt-5 p-[10px] w-full bg-[#007916] text-white rounded-sm'>Sign Up</button>
                        <p className='py-3 text-right'></p>
                    </div>

                </div>
            </div>
        </div>
    </main>
  )
}