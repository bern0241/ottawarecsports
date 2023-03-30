/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import DeleteSeasonModal from "./Modals/DeleteSeasonModal";
import EditSeasonModal from "./Modals/EditSeasonModal";

export default function SeasonCard({ season, selectedSeason, setSelectedSeason, selectedLeague }) {

    return (
        <>
        <tr onClick={(e) => clickedSeason(e, season)} class="bg-white border border-gray-400 cursor-pointer">
                <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selectedSeason && selectedSeason.id === season.id && (
                        <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
                    )}
                    {season.name}
                </th>
                <td class="px-6 py-3">
                    {convertDateReadable(season.starts)}
                </td>
                <td class="px-6 py-3">
                    {convertDateReadable(season.ends)}
                </td>
                <td class="px-6 py-3">
                    {season.status}
                </td>
                <td class="flex gap-4 px-6 py-4 text-center justify-center">
                    <ion-icon onClick={(e) => goToSchedulePage(e)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="people"></ion-icon>
                    <ion-icon onClick={(e) => editSeasonFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></ion-icon>
                    <ion-icon onClick={(e) => deleteSeasonFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></ion-icon>
                </td>
                </tr>
        
        {deleteModal && (
            <DeleteSeasonModal leagueInfo={selectedLeague} seasonInfo={season} setDeleteModal={setDeleteModal} listSeasonsFunc={listSeasonsFunc} />
        )}
        {editModal && (
            <EditSeasonModal season={season} selectedLeague={selectedLeague} setOpenModal={setEditModal} listSeasonsFunc={listSeasonsFunc} setSelectedSeason={setSelectedSeason} />
        )}
    </>
    )
}