/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/common/Layout';
import styles from '@/styles/Home.module.css';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';

// Components
import SignOutButton from '@/components/common/SignOutButton';

// Tables
import ACPLeagueTable from '@/components/admin-portal/ACPLeague/LeagueTable';
import ACPSeasonTable from '@/components/admin-portal/ACPLeague/SeasonTable';
import ACPDivisionTable from '@/components/admin-portal/ACPLeague/DivisionTable';
import TeamTable from '@/components/admin-portal/ACPLeague/TeamTable';

  export default function Home() {
      const [user, setUser, authRoles, setAuthRoles] = useUser();

    const [selectedLeague, setSelectedLeague] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState(null);

      return (
          <>
              <Head>
                  <title>Ottawa Rec Sports</title>
                  <meta name="description" content="Generated by create next app" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="icon" href="/images/ORS-Logo.png" />
              </Head>
  
              <main className='w-full flex justify-center max-w-[70em] mx-auto'>
                  <div className="flex flex-col w-full">
                    <ACPLeagueTable sport='Soccer' 
                                selectedLeague={selectedLeague} 
                                setSelectedLeague={setSelectedLeague} />
                    <ACPSeasonTable selectedLeague={selectedLeague}
                                selectedSeason={selectedSeason} 
                                setSelectedSeason={setSelectedSeason} />
                    <ACPDivisionTable selectedSeason={selectedSeason}
                        selectedDivision={selectedDivision} 
                        setSelectedDivision={setSelectedDivision} 
                        selectedLeague={selectedLeague} 
                        /> 
                  </div>
              </main>
          </>
      );
  }
  