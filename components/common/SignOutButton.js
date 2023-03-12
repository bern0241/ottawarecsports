/**
 * Last updated: 2023-03-11
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react'
import { Auth } from 'aws-amplify';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';

export default function SignOutButton() {
    const [user, setUser] = useUser();
    const router = useRouter();

    const signOut = async (e) => {
        e.preventDefault();
        await Auth.signOut();
        setUser(null);
        router.push('/login')
    }

  return (
    <>
    <button onClick={(e) => signOut(e)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Out</button>
    </>
  )
}