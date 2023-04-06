/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { listTeamDivisions, getDivision } from '@/src/graphql/queries';
// import { listTeamsWithPlayers } from '@/src/graphql/custom-queries';
import { API } from '@aws-amplify/api';
import { useRouter } from 'next/router';
import CreateButton from '../../../common/CreateButton';
import AddTeamDropdown from './AddTeamDropdown';
 
 export default function TeamTable() {
     const [division, setDivision] = useState({});
     const [teamDivisions, setTeamDivisions] = useState([]);
     const [addTeamModal, setAddTeamModal] = useState(false);
     const router = useRouter();
     const {divisionID} = router.query;

     useEffect(() => {
        if (!divisionID) return;
        const callMeAsync = async () => {
            getDivisionFunc(divisionID);
            listTeamDivisionsFunc(divisionID);
        }
        callMeAsync();
     }, [divisionID])

     const getDivisionFunc = async () => {
        const apiData = await API.graphql({ query: getDivision, variables: { id: divisionID }});
        const data = await apiData.data.getDivision;
        setDivision(data);
     }
  
     const listTeamDivisionsFunc = async () => {
        const timer = setTimeout(async () => {
            const variables = { 
                filter: {
                    divisionId: {
                        eq: divisionID
                    }
                }
            }
            const teamDivisions = await API.graphql({
                query: listTeamDivisions, variables: variables
            })
           //  console.log('TEAMDIVISIONS', teamDivisions);
            setTeamDivisions(teamDivisions.data.listTeamDivisions.items);
		}, 500);
		return () => clearTimeout(timer);
     }
 
     return (
         <>
         <div class="relative overflow-x-auto mx-auto px-4 w-full my-[1.3rem]">
             <table class="w-full text-sm text-left border border-gray-400">
                 <thead class="text-md text-black bg-white">
                     <tr>
                         <th scope="col" class="text-lg font-medium px-6 py-7">
                             <p className='absolute top-4'><span className='font-semibold'>{division && division.name}</span> Division - All Teams</p>
                         </th>
                         <th scope="col" class="font-medium px-6 py-4">
                             
                         </th>
                         <th scope="col" class="font-medium px-6 py-4">
                             
                         </th>
                         <th scope="col" class="font-medium">
                            <div className='absolute top-2 right-8 '>
                                <CreateButton label="Add Team"
                                            state={addTeamModal}
                                            setState={setAddTeamModal} 
                                            />
                            </div>
                         </th>
                     </tr>
                 </thead>
                 <thead class="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                     <tr>
                         <th scope="col" class="font-light px-6 py-2 border-l-[1px] border-gray-400">
                             Name
                         </th>
                         <th scope="col" class="font-light px-6 py-2">
                             Captain (s)
                         </th>
                         <th scope="col" class="font-light px-6 py-2">
                             Members
                         </th>
                         <th scope="col" class="font-light py-2 border-r-[1px] text-center border-gray-400">
                             Action
                         </th>
                     </tr>
                 </thead>
                 <tbody>
                     {teamDivisions && teamDivisions.map((teamDiv) => (
                     <>
                         <TeamCard teamDivision={teamDiv} listTeamDivisionsFunc={listTeamDivisionsFunc} />
                     </>
                     ))}
                     {(teamDivisions && teamDivisions.length === 0) && (
                         <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                         <th scope="row" class="px-6 my-2 font-medium whitespace-nowrap dark:text-white flex items-center justify-center text-xs absolute left-0 right-0 mx-auto italic">
                             No teams for this division.
                         </th>
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
                         <td class="flex gap-4 px-6 py-4 text-center">
                         </td>
                     </tr>
                     
                 </tbody>
             </table>
         </div>
         {addTeamModal && (
            <AddTeamDropdown setOpenDropdown={setAddTeamModal} teamDivisions={teamDivisions} listTeamDivisionsFunc={listTeamDivisionsFunc} />
        )}
       </>
     )
 }