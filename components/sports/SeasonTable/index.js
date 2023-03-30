/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import SeasonCard from './SeasonCard';
import CreateButton from '../CreateButton';
import CreateSeasonModal from './Modals/CreateSeasonModal';

export default function SeasonTable({ selectedSeason, setSelectedSeason, selectedLeague }) {
    const [newSeasonModal, setNewSeasonModal] = useState(false);
    const [seasons, setSeasons] = useState([]);

    return (
        <>
        <div class="relative overflow-x-auto mx-auto px-4 max-w-[70em] my-[1.3rem]">
            <table class="w-full text-sm text-left border border-gray-400">
                <thead class="text-md text-black bg-white">
                    <tr>
                        <th scope="col" class="font-medium px-6 py-4">
                            Season
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th className='absolute right-5 top-2'>
                            <CreateButton label="Create New Season"
                                            state={openNewSeason}
                                            setState={setOpenNewSeason} 
                                            selectedType={selectedLeague} />
                        </th>
                    </tr>
                </thead>
                <thead class="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="font-light px-6 py-2 border-l-[1px] border-gray-400">
                            Name
                        </th>
                        <th scope="col" class="font-light px-6 py-2">
                            Start
                        </th>
                        <th scope="col" class="font-light px-6 py-2">
                            End
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
                    {seasons && seasons.map((season) => (
                    <>
                        <SeasonCard season={season} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} selectedLeague={selectedLeague} listSeasonsFunc={listSeasonsFunc} />
                    </>
                    ))}
                    {(seasons && selectedLeague !== null && seasons.length === 0) && (
                        <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                        <th scope="row" class="px-6 my-2 font-medium whitespace-nowrap dark:text-white flex items-center justify-center text-xs absolute left-0 right-0 mx-auto italic">
                            No seasons for this league.
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
                    )}
        
                    <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer">
                            All Seasons
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
                {openNewSeason && (
                    <>
                    <CreateSeasonModal openModal={openNewSeason} setOpenModal={setOpenNewSeason} selectedLeague={selectedLeague} listSeasonsFunc={listSeasonsFunc} setSelectedSeason={setSelectedSeason} />
                     </>
                )}
               </>
    )
}