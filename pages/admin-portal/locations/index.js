/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { IconCirclePlus } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import AWS from 'aws-sdk';
import { API } from 'aws-amplify';
import { useUser } from '@/context/userContext';
import Link from 'next/link';
//Components
import ACPSearchUserBar from '@/components/admin-portal/users/ACPSearchUserBar';
import NewLocation from '@/components/admin-portal/locations/NewLocation';
import EditLocation from '@/components/admin-portal/locations/EditLocation';
import DeleteLocation from '@/components/admin-portal/locations/DeleteLocation';
import { listLocations } from '@/src/graphql/queries';

export default function LocationsPage() {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [locations, setLocations] = useState([]);
	const [editLocation, setEditLocation] = useState({});
	//Modals
	const [editLocationModal, setEditLocationModal] = useState(false);
	const [deleteLocationModal, setDeleteLocationModal] = useState(false);

	useEffect(() => {
		fetchLocations();
	}, []);
	// Gets all locations
	async function fetchLocations() {
		const locationsFetch = await API.graphql({
			query: listLocations,
		});
		setLocations(locationsFetch.data.listLocations.items);
	}
	// Opens edit location modal when a location is set/pressed.
	const editLocationClicked = (e, location) => {
		e.preventDefault();
		setEditLocationModal(true);
		setEditLocation(location);
	};
	// Opens delete location modal when a location is set/pressed;
	const deleteLocationClicked = (e, location) => {
		e.preventDefault();
		setDeleteLocationModal(true);
		setEditLocation(location);
	};

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
				<title>Ottawa Rec Sports - Locations</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>

			<main className="p-4 w-full">
				<div className="flex justify-end mx-auto max-w-[50em] relative top-0">
					<NewLocation locations={locations} setLocations={setLocations} />
				</div>
				{locations &&
					locations.map((location, index) => (
						<React.Fragment key={index}>
							<div className="flex flex-col justify-center text-center p-3 max-w-[50em] my-2 mx-auto bg-white border border-black shadow-md">
<<<<<<< HEAD
                <button onClick={(e) => editLocationClicked(e, location)} className="absolute translate-y-[-15px]">
                  <IconEdit
                    style={{
                      fontSize: '20px',
                      cursor: 'pointer',
                    }}
                    name="create-outline"
                  ></IconEdit>
                </button>
                <button onClick={(e) => {
                      deleteLocationClicked(e, location);
                    }} className='absolute translate-x-[25px] translate-y-[-15px]'>
                  <IconTrash
                    style={{
                      fontSize: '20px',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                    name="trash-outline"
                  ></IconTrash>
                </button>
=======
								<button className='absolute translate-x-[0px] translate-y-[-14px]' onClick={(e) => editLocationClicked(e, location)}>
								<IconEdit
									style={{
										fontSize: '20px',
										cursor: 'pointer',
									}}
									name="create-outline"
								></IconEdit>
								</button>
								<button className='absolute translate-x-[25px] translate-y-[-14px]' onClick={(e) => {
										deleteLocationClicked(e, location);
									}}>
								<IconTrash
									style={{
										fontSize: '20px',
										cursor: 'pointer',
										color: 'red',
									}}
									name="trash-outline"
								></IconTrash>
								</button>
>>>>>>> 1f201865765626be5b7b1de0492ba8288281cb30
								<div>
									<p tabIndex='0' className="text-lg">{location.name}</p>
									<Link
										style={{
											fontSize: '0.9rem',
											color: 'blue',
											textDecoration: 'underline',
										}}
										href={location.weblink}
									>
										{location.weblink}
									</Link>
								</div>
							</div>
						</React.Fragment>
					))}
				{locations.length === 0 && (
					<div className="text-black mx-auto flex justify-center items-center h-10">
						No locations exist.
					</div>
				)}
			</main>
			{/* Add User modal */}
			{editLocationModal && (
				<EditLocation
					openModal={editLocationModal}
					setOpenModal={setEditLocationModal}
					location={editLocation}
					fetchLocations={fetchLocations}
				/>
			)}
			{deleteLocationModal && (
				<DeleteLocation
					location={editLocation}
					setOpenModal={setDeleteLocationModal}
					fetchLocations={fetchLocations}
				/>
			)}
		</>
	);
}
