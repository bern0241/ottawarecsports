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
import { getImageFromS3 } from '@/utils/graphql.services';
 
 export default function TeamCard({ teamDivision, listTeamDivisionsFunc }) {
     const [removeModal, setRemoveModal] = useState(false);
     const [membersCount, setMembersCount] = useState(0);
     const [teamImage, setTeamImage] = useState(null);
     const router = useRouter();

     useEffect(() => {
      console.log(teamDivision);
      // if (team.Players.items) {
      //   setMembersCount(team.Players.items.length);
      // }
      getTeamImage();
     }, [listTeamDivisionsFunc])

     const getTeamImage = async () => {
      if (teamDivision.team.team_picture === null || teamDivision.team.team_picture === '') {
          setTeamImage(null);
      } else {
          const url = await getImageFromS3(teamDivision.team.team_picture);
          setTeamImage(url);
      }
  }
 
     const removeTeamFunc = (e) => {
         e.stopPropagation();
         setRemoveModal(!removeModal);
     }
 
     const goToTeamPage = (e) => {
         e.preventDefault();
         router.push(`/teams/${teamDivision.team.id}`)
     }
 
     return (
         <>
         <tr onClick={(e) => goToTeamPage(e)} class="bg-white border border-gray-400 cursor-pointer">
                 <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                  <img
                        style={{ objectFit: 'cover' }}
                        width={132}
                        height={132}
                        className="w-[3rem] h-[3rem] rounded-full shadow-md border border-black"
                        src={`${teamImage ? teamImage : "/images/defaultProfilePic.jpeg"}`}
                    />
                    {teamDivision.team.name}
                 </th>
                 <td class="px-6 py-3">
                 
                   <p>Justin Bernard</p>
                 </td>
                 <td class="px-6 py-3">
                     {membersCount}
                 </td>
                 <td class="flex gap-4 px-6 py-4 text-center justify-center">
                     <IconTrash onClick={(e) => removeTeamFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconTrash>
                 </td>
                 </tr>
         
         {removeModal && (
             <RemoveTeamModal teamDivision={teamDivision} setRemoveModal={setRemoveModal} listTeamDivisionsFunc={listTeamDivisionsFunc} />
         )}
     </>
     )
 }