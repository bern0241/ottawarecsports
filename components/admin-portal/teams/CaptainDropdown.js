/**
 * Last updated: 2023-04-06
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import UserCard from '../leagues/LeagueTable/CoordinatorDropdown/UserCard'; // Turn into common component
 
 export default function CaptainDropdown({ listUsers, setOpenCaptainDrop, setCaptain }) {
  const [search, setSearch] = useState('');
  const [searchUser, setSearchUser] = useState('');
 
     // Sets a captain when one is clicked.
     // Closes dropdown.
    const addCaptain = (e, user) => {
        e.preventDefault();
        setCaptain(user);
        setOpenCaptainDrop(false);
    }
    // Called when search button is pressed - applies search bar text into action
    const setSearchFunc = () => {
      setSearchUser(search);
    }
    // If search is empty, reinitialize search for all captains.
    useEffect(() => {
      if (search === '') {
        setSearchUser('');
      }
    }, [search])
 
     return (
     <>
     {/* <!-- Dropdown menu --> */}
     <div id="dropdownSearch" class="z-[500] border fixed bg-white rounded-lg shadow-md w-[21rem] dark:bg-gray-700">
     <div class="p-3">
       <label for="input-group-search" class="sr-only">Search</label>
       <div class="relative">
         <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
 
         </div>
         <input onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setSearchFunc(e)
          }
         }} value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="input-group-search" class="block w-[69%] p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
         <button onClick={(e) => setSearchFunc(e)} class="text-white absolute right-0 top-[1px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
 
       </div>
     </div>
   <ul class="h-[20rem] py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
     
     {listUsers && listUsers.filter((user) => {
         const searchItem = searchUser.toLocaleLowerCase();
         const v = `${user.Attributes.find(o => o.Name === 'name')['Value'].toLocaleLowerCase()} ${user.Attributes.find(o => o.Name === 'family_name')['Value'].toLocaleLowerCase()}`
         if (!searchItem) return true;
         return v.startsWith(searchItem);
     })
     .map((user) => (
         <>
         <li className='cursor-pointer' onClick={(e) => addCaptain(e, user)}>
             <UserCard searchUser={searchUser} user={user} />
         </li>
         </>
     ))}
 
    </ul>
    <a href="#" class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline   py-5">
    </a>
  </div>
     </>
     )
 }