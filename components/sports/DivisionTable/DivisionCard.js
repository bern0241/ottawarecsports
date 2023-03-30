/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DeleteDivisionModal from './Modals/DeleteDivisionModal';
import EditDivisionModal from './Modals/EditDivisionModal';

export default function DivisionCard({ division, selectedDivision, setSelectedDivision, selectedSeason, listDivisionsFunc }) {

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const router = useRouter();

    return (
        <>
        <tr onClick={(e) => clickedDivision(e, division)} class="bg-white border border-gray-400 cursor-pointer">
                <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selectedDivision && selectedDivision.id === division.id && (
                        <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
                    )}
                    {division.name}
                </th>
                <td class="px-6 py-3">
                    {division.level}
                </td>
                <td class="px-6 py-3">
                    {division.gender}
                    {/* USE division.description IN Real thing */}
                </td>
                <td class="px-6 py-3">
                    {division.status}
                </td>
                <td class="flex gap-4 px-6 py-4 text-center justify-center">
                    <ion-icon onClick={(e) => gameScheduleNavigate(e, division)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="calendar-outline"></ion-icon>
                    <ion-icon onClick={(e) => editDivisionFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></ion-icon>
                    <ion-icon onClick={(e) => deleteDivisionFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></ion-icon>
                </td>
                </tr>
        
        {deleteModal && (
            <DeleteDivisionModal seasonInfo={selectedSeason} divisionInfo={division} setDeleteModal={setDeleteModal} listDivisionsFunc={listDivisionsFunc} />
        )}
        {editModal && (
            <EditDivisionModal division={division} selectedSeason={selectedSeason} setOpenModal={setEditModal} listDivisionsFunc={listDivisionsFunc} setSelectedDivision={setSelectedDivision} />
        )}
    </>
    )
}