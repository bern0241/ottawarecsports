/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES:
// https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/buttons/
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s

import React, { useState, useEffect } from 'react';
import { updateLocation } from '@/src/graphql/mutations';
import { API } from 'aws-amplify';

export default function EditLocation({
	location,
	openModal,
	setOpenModal,
	fetchLocations,
}) {
	const [name, setName] = useState(location.name);
	const [weblink, setWeblink] = useState(location.weblink);
	const [message, setMessage] = useState(null);

	// Hides the display message everytime the modal opens.
	useEffect(() => {
		setMessage(null);
	}, [openModal]);

	// Updates the location by name and weblink
	const UpdateLocation = async (e) => {
		e.preventDefault();
		if (name === '' || weblink === '') {
			setMessage({
				status: 'error',
				message: 'Please fillout required fields.',
			});
			return;
		}
		try {
			const data = {
				id: location.id,
				name: name,
				weblink: weblink,
			};
			const apiData = await API.graphql({
				query: updateLocation,
				variables: { input: data },
			});
			setOpenModal(false); // Hides modal
			fetchLocations(); // Fetches locations
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div
				id="authentication-modal"
				tabIndex="-1"
				aria-hidden="true"
				className="fixed left-0 right-0 top-[50%] translate-y-[-50%] z-[200] w-[28rem] mx-auto my-auto"
			>
				<div className="w-full h-full max-w-md md:h-auto">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
						<button
							onClick={() => setOpenModal(!openModal)}
							type="button"
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							data-modal-hide="authentication-modal"
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>

						<div className="px-6 py-6 lg:px-8">
							<h2 className="mb-7 text-xl text-center font-medium text-gray-900 dark:text-white">
								Edit Location
							</h2>
							<form className="space-y-6" action="#">
								<div className="">
									<div className="w-full mb-4">
										<label
											htmlFor="name"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Location name
										</label>
										<input
											autoFocus
											value={name}
											onChange={(e) => setName(e.target.value)}
											type="text"
											name="name"
											id="name"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											placeholder="Albert Street School"
											required
										/>
									</div>
									<div className="w-full pb-1">
										<label
											htmlFor="weblink"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Web Link
										</label>
										<input
											value={weblink}
											onChange={(e) => setWeblink(e.target.value)}
											type="text"
											name="weblink"
											id="weblink"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											placeholder="https://ottawarecsports.com/albert-street-school/"
											required
										/>
									</div>
								</div>

								{message && (
									<p
										id="standard_error_help"
										className={`my-2 text-center text-sm ${
											message.status === 'success'
												? 'text-green-600 dark:text-green-400'
												: 'text-red-600 dark:text-red-400'
										}`}
									>
										<span className="font-medium">{message.message}</span>
									</p>
								)}

								<button
									onClick={UpdateLocation}
									type="submit"
									className="w-full text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
								>
									Edit Location
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
					<div
						onClick={(e) => setOpenModal(false)}
						className="z-[150] opacity-50 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
					/>

			{/* {openModal && (
    )} */}
		</>
	);
}
