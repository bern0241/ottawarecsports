/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES:
// https://flowbite.com/docs/components/buttons/
// https://flowbite.com/docs/forms/search-input/

import React, { useState, useEffect } from 'react';

export default function ACPSearchUserBar({ setSearchResult }) {
	const [search, setSearch] = useState('');

	const enterSearch = (e) => {
		e.preventDefault();
		setSearchResult(search);
	};

	useEffect(() => {
		if (search === '') {
			setSearchResult('');
		}
	}, [search]);

	return (
		<form class="flex items-end mb-5">
			<label for="simple-search" class="sr-only">
				Search
			</label>
			<div class="relative w-[15rem] ml-[1.4rem]">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					type="text"
					id="simple-search"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
					placeholder="Search name"
				/>
			</div>
			<button
				onClick={(e) => enterSearch(e)}
				type="submit"
				class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-800 rounded-lg border border-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-700"
			>
				<svg
					class="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
				<span class="sr-only">Search</span>
			</button>
		</form>
	);
}
