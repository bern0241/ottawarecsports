/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import CreateButton from '../CreateButton';
import LeagueCard from './LeagueCard';
import CreateLeagueModal from './Modals/CreateLeagueModal';

export default function LeagueTable({ sport, selectedLeague, setSelectedLeague}) {
    const [newLeagueModal, setNewLeagueModal] = useState(false);
    const [leagues, setLeagues] = useState([]);

    const listLeaguesFunc = () => {
    }

    return (
        <>
        <div class="relative overflow-x-auto mx-auto px-4 w-full my-[1rem]">
            <table class="w-full text-sm text-left border border-gray-400">
                <thead class="text-md text-black bg-white">
                    <tr>
                        <th scope="col" class="font-medium px-6 py-4">
                            League
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th className='absolute right-5 top-2'>
                            <CreateButton label="Create New League"
                                            state={newLeagueModal}
                                            setState={setNewLeagueModal} />
                        </th>
                    </tr>
                </thead>
                <thead class="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="font-light px-6 py-2 border-l-[1px] border-gray-400">
                            Name
                        </th>
                        <th scope="col" class="font-light px-6 py-2">
                            # of Teams
                        </th>
                        <th scope="col" class="font-light px-6 py-2">
                            Coordinator(s)
                        </th>
                        <th scope="col" class="font-light px-6 py-2">
                            Status
                        </th>
                        <th scope="col" class="font-light py-2 border-r-[1px] text-center border-gray-400">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {leagues && leagues.map((league) => (
                    <>
                        <LeagueCard league={league} selectedLeague={selectedLeague} setSelectedLeague={setSelectedLeague} sport={sport} listLeaguesFunc={listLeaguesFunc} />
                    </>
                    ))}
        
                    <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer">
                            All Leagues
                            <ion-icon style={{fontSize: '20px', color: 'blue'}} name="chevron-forward-outline"></ion-icon>
                        </th>
                        <td class="px-6 py-4">
                        </td>
                        <td class="px-6 py-4">
                        </td>
                        <td class="px-6 py-4">
                        </td>
                        <td class="flex gap-4 px-6 py-4 text-center">
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
         {newLeagueModal && (
             <>
             {/* <CreateLeagueModal sport={sport} openModal={newLeagueModal} setOpenModal={setNewLeagueModal} listLeaguesFunc={listLeaguesFunc} /> */}
              </>
         )}
        </>
     )
 }