/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { IconUsers, IconEdit, IconTrash, IconListDetails } from '@tabler/icons-react';
import EditSeasonModal from '@/components/common/sports/Seasons/EditSeasonModal';
import DeleteSeasonModal from '@/components/common/sports/Seasons/DeleteSeasonModal';
import { useUser } from '@/context/userContext';

export default function SeasonCard({ season, selectedSeason, setSelectedSeason, selectedLeague, listSeasonsFunc }) {
    const [user, setUser, authRoles, setAuthRoles] = useUser();
    const [isCoordinator, setIsCoordinator] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const router = useRouter();

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

    const clickedSeason = (e) => {
        e.preventDefault();
        setSelectedSeason(season);
    }

    const convertDateReadable = (date) => {
        let convertedDate = date.replaceAll('-', '/');
        let newDate = new Date(convertedDate);
        newDate.toString().replaceAll('-', '/')
        let newDateSplit = newDate.toString().split(' ');
        let newDateConcatnate = `${newDateSplit[1]} ${newDateSplit[2]}`
        return newDateConcatnate;
    }

    const goToSchedulePage = (e) => {
        e.preventDefault();
        router.push({
            pathname: '/schedule/soccer',
            query: { leagueID: selectedLeague.id, seasonID: selectedSeason.id }
        })
    }

    const editSeasonFunc = (e) => {
        e.stopPropagation();
        setEditModal(!editModal);
    }

    const deleteSeasonFunc = (e) => {
        e.stopPropagation();
        setDeleteModal(!deleteModal);
    }

    return (
        <>
        <tr onClick={(e) => clickedSeason(e)} className="bg-white border border-gray-400 cursor-pointer">
                <th scope="row" className="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selectedSeason && selectedSeason.id === season.id && (
                        <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
                    )}
                    {season.name}
                </th>
                <td className="text-center px-6 py-3">
                    {convertDateReadable(season.start_date)}
                </td>
                <td className="text-center px-6 py-3">
                    {convertDateReadable(season.end_date)}
                </td>
                
                <td className="flex gap-2 py-3 justify-center pr-5">
                <div className='flex-grow'></div>
                <IconListDetails onClick={(e) => goToSchedulePage(e)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="people"></IconListDetails>
                
                {(isCoordinator || (authRoles && authRoles.includes('Admin')) || (authRoles && authRoles.includes('Owner'))) && (
                    <>
                    <IconEdit onClick={(e) => editSeasonFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></IconEdit>
                    <IconTrash onClick={(e) => deleteSeasonFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconTrash>
                    </>
                )}
                </td>
                </tr>

        {deleteModal && (
            <DeleteSeasonModal leagueInfo={selectedLeague} seasonInfo={season} setDeleteModal={setDeleteModal} listSeasonsFunc={listSeasonsFunc} />
        )}
        {editModal && (
            <EditSeasonModal season={season} selectedLeague={selectedLeague} setOpenModal={setEditModal} setSelectedSeason={setSelectedSeason} listSeasonsFunc={listSeasonsFunc} />
        )}
    </>
    )
}