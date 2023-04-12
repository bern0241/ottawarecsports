/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import SeasonCard from './SeasonCard';
import CreateButton from '@/components/common/CreateButton';
import CreateSeasonModal from '@/components/common/sports/Seasons/CreateSeasonModal';
import { listSeasons } from '@/src/graphql/queries';
import { API } from '@aws-amplify/api';
import { useUser } from '@/context/userContext';

export default function SeasonTable({ selectedSeason, setSelectedSeason, selectedLeague }) {
    const [user, setUser, authRoles, setAuthRoles] = useUser();
    const [isCoordinator, setIsCoordinator] = useState(false);
    const [newSeasonModal, setNewSeasonModal] = useState(false);
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
        if (selectedLeague) {
            listSeasonsFunc();
            isCoordinatorOfLeagueCheck();
        }
        if (selectedLeague = null) {
            setSeasons([]);
            setSelectedSeason(null);
        }
    }, [selectedLeague])

    const isCoordinatorOfLeagueCheck = () => {
        if (selectedLeague.coordinators.includes(user?.username)) {
            setIsCoordinator(true);
        } else {
            setIsCoordinator(false);
        }
    }

    const listSeasonsFunc = async () => {
        const variables = { 
            filter: {
                league: {
                    eq: selectedLeague.id
                }
            }
        }
        const seasons = await API.graphql({
            query: listSeasons, variables: variables
        })
        setSeasons(seasons.data.listSeasons.items);

        if (seasons.data.listSeasons.items.length !== 0) {
            setSelectedSeason(seasons.data.listSeasons.items[0]);
          } else {
            setSelectedSeason(null);
          }
    }

    return (
        <>
        <div className="relative overflow-x-auto mx-auto px-4 w-full my-[1.3rem]">
            <table className="w-full text-sm text-left border border-gray-400">
                <thead className="text-md text-black bg-white">
                    <tr>
                        <th scope="col" className="text-lg font-medium px-6 py-4 pb-[2.8rem] text-[1rem]">
                            {!selectedLeague && (<p className='absolute'>{`Season`}</p>)}
                            {selectedLeague && (<p className='absolute'>Seasons for <span className='font-semibold underline'>{selectedLeague.name}</span></p>)}
                        </th>
                        <th scope="col" className="font-medium px-6 py-4">
                            
                        </th>
                        <th scope="col" className="font-medium px-6 py-4">
                            
                        </th>
                        <th className='absolute right-5 top-2'>
                            {(isCoordinator || (authRoles && authRoles.includes('Admin')) || (authRoles && authRoles.includes('Owner'))) && (
                                <CreateButton label="Create New Season"
                                    state={newSeasonModal}
                                    setState={setNewSeasonModal} 
                                    selectedType={selectedLeague} />
                            )}
                        </th>
                    </tr>
                </thead>
                <thead className="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="font-light px-6 py-2 border-l-[1px] border-gray-400">
                            Name
                        </th>
                        <th scope="col" className="text-center font-light px-6 py-2">
                            Start
                        </th>
                        <th scope="col" className="text-center font-light px-6 py-2">
                            End
                        </th>
                        <th scope="col" className="font-light py-2 border-r-[1px] text-right pr-10 border-gray-400">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {seasons && seasons.map((season, index) => (
                    <React.Fragment key={index}>
                        <SeasonCard season={season} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} selectedLeague={selectedLeague} listSeasonsFunc={listSeasonsFunc} />
                    </React.Fragment>
                    ))}
                    {(seasons && selectedLeague !== null && seasons.length === 0) && (
                        <tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                        <th scope="row" className="px-6 my-2 font-medium whitespace-nowrap dark:text-white flex items-center justify-center text-xs absolute left-0 right-0 mx-auto italic">
                            No seasons for this league.
                        </th>
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4">
                        </td>
                        <td className="flex gap-4 px-6 py-4 text-center">
                        </td>
                    </tr>
                    )}
        
                    <tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                        <th scope="row" className="px-6 py-6 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer">
                            {/* All Seasons
                            <ion-icon style={{fontSize: '20px', color: 'blue'}} name="chevron-forward-outline"></ion-icon> */}
                        </th>
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4">
                        </td>
                        <td className="flex gap-4 px-6 py-4 text-center">
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        {newSeasonModal && (
            <>
            <CreateSeasonModal openModal={newSeasonModal} setOpenModal={setNewSeasonModal} selectedLeague={selectedLeague} listSeasonsFunc={listSeasonsFunc} setSelectedSeason={setSelectedSeason} />
            </>
        )}
      </>
    )
}