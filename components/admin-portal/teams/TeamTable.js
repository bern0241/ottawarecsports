/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

 import React, { useState, useEffect } from 'react';
 import TeamCard from './TeamCard';
 import { listTeams } from '@/src/graphql/queries';
 import { API } from '@aws-amplify/api';
 import { useRouter } from 'next/router';
import CreateButton from '@/components/common/CreateButton';
import NewTeamModal from './NewTeamModal';
  
  export default function TeamTable({ filterTeams, fetchTeams }) {
    const [createTeamModal, setCreateTeamModal] = useState(false);
    const router = useRouter();
  
      return (
          <>
          <div class="relative overflow-x-auto mx-auto px-4 w-full my-[1.3rem]">
              <table class="w-full text-sm text-left border border-gray-400">
                  <thead class="text-md text-black bg-white">
                      <tr>
                          <th scope="col" class="text-lg font-medium px-6 py-7">
                              <p className='absolute top-4'>All Teams</p>
                          </th>
                          <th scope="col" class="font-medium px-6 py-4">
                              
                          </th>
                          <th scope="col" class="font-medium px-6 py-4">
                              
                          </th>
                          <th scope="col" class="font-medium">
                             <div className='absolute top-2 right-8 '>
                                 <CreateButton label="Create Team"
                                             state={createTeamModal}
                                             setState={setCreateTeamModal} 
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
                              Sport
                          </th>
                          <th scope="col" class="font-light py-2 border-r-[1px] text-center border-gray-400">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {filterTeams && filterTeams.map((team, index) => (
                            <>
                            <TeamCard key={index} team={team} fetchTeams={fetchTeams} filterTeams={filterTeams} />
                            </>
                        ))}
                      {/* {(filterTeams && filterTeams.length === 0) && (
                          <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                          <th scope="row" class="px-6 my-2 font-medium whitespace-nowrap dark:text-white flex items-center justify-center text-xs absolute left-0 right-0 mx-auto italic">
                              No teams available.
                          </th>
                          <td class="px-6 py-4">
                          </td>
                          <td class="px-6 py-4">
                          </td>
                          <td class="flex gap-4 px-6 py-4 text-center">
                          </td>
                      </tr>
                      )} */}
          
                      <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer">
                              
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
          {createTeamModal && (
             <NewTeamModal isVisible={createTeamModal} setIsVisible={setCreateTeamModal} />
         )}
        </>
      )
  }