/**
 * Last updated: 2023-03-18
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SettingsPage from '@/components/settings-page/SettingPage';

export default function Setting(){
	const [uiState, setUiState] = useState(null);
  useEffect(() => {
		setUiState('settingPage');
	}, []);

  return(
    <>
			<Head>
				<title>Ottawa Rec Sports : Settings</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>

			{uiState === 'settingPage' && (
        <SettingsPage/>
			)}
		</>
  )
}