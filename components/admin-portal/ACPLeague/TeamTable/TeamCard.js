/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import RemoveTeamModal from './RemoveTeamModal';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/router';
 
 export default function TeamCard({ team, division, listTeamsFunc }) {
    //  const [editModal, setEditModal] = useState(false);
     const [removeModal, setRemoveModal] = useState(false);
     const [membersCount, setMembersCount] = useState(0);
     const router = useRouter();

     useEffect(() => {
      console.log(team);
      if (team.Players.items) {
        setMembersCount(team.Players.items.length);
      }
     }, [])
 
     const removeTeamFunc = (e) => {
         e.stopPropagation();
         setRemoveModal(!removeModal);
     }
 
     const goToTeamPage = (e) => {
         e.preventDefault();
         router.push(`/teams/${team.id}`)
     }
 
     return (
         <>
         <tr onClick={(e) => goToTeamPage(e)} class="bg-white border border-gray-400 cursor-pointer">
                 <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {team.name}
                 </th>
                 <td class="px-6 py-3">
                    Justin Bernard
                 </td>
                 <td class="px-6 py-3">
                     {membersCount}
                 </td>
                 <td class="flex gap-4 px-6 py-4 text-center justify-center">
                     <IconTrash onClick={(e) => removeTeamFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconTrash>
                 </td>
                 </tr>
         
         {removeModal && (
             <RemoveTeamModal team={team} division={division} />
         )}
     </>
     )
 }