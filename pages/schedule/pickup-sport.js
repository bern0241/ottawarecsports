/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function PickupSports() {
	return (
		<>
			<Head>
				<title>Ottawa Rec Sports - Pickup Sports</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>

			<main className="flex flex-col justify-center items-center w-full">
				<h1 className="text-xl">Pickup sports is coming soon!</h1>
				<p>Please check back again later.</p>
			</main>
		</>
	);
}
