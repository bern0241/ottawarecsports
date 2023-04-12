/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

 import React, { useState, useEffect } from 'react';
 import Head from 'next/head';
 import { IconChevronLeft, IconChevronsDownLeft } from '@tabler/icons-react';;
 import { useUser } from '@/context/userContext';
 import { useRouter } from 'next/router';
 // Tables
 import TeamTable from '@/components/common/sports/TeamTable';
 
   export default function ACPLeaguesDivisionPage() {
       const [user, setUser, authRoles, setAuthRoles] = useUser();
       const router = useRouter();

        // Only Admins or Owner can access page
       if (!user || (!authRoles.includes('Admin') && !authRoles.includes('Owner'))) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <h2>You do not have access for this page</h2>
            </div>
        );
    }
 
       return (
           <>
               <Head>
                   <title>Ottawa Rec Sports - League</title>
                   <meta name="description" content="Generated by create next app" />
                   <meta name="viewport" content="width=device-width, initial-scale=1" />
                   <link rel="icon" href="/images/ORS-Logo.png" />
               </Head>
   
               <main className='w-full flex justify-center max-w-[70em] mx-auto'>
                    <div className='absolute right-2 translate-y-[0px]'>
                        <button onClick={(e) => router.push(`/admin-portal/leagues`)} type="button" className="text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-[.5rem] mr-2 mb-2 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-700 dark:border-blue-700 pl-2">
                            <p className='flex flex-row'>{<IconChevronLeft />} Back</p>
                        </button>
                    </div>

                   <div className="flex flex-col w-full mt-[2.4rem]">
                         <TeamTable />
                   </div>
               </main>
           </>
       );
   }
   