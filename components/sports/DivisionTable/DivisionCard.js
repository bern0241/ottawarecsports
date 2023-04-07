/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getDivisionWithTeams } from '@/src/graphql/custom-queries';
import { IconUsers } from '@tabler/icons-react';
import { API } from '@aws-amplify/api';
import { convertLevelToFull } from '@/utils/handy-dandy-functions';

export default function DivisionCard({ division, selectedDivision, setSelectedDivision, selectedSeason, listDivisionsFunc }) {
    const [teamCount, setTeamCount] = useState(0);
    const router = useRouter();

    useEffect(()=>{
        getTeamsCount();
    }, []);

    const clickedDivision = (e) => {
        e.preventDefault();
        setSelectedDivision(division);
    }

    const gameScheduleNavigate = (e) => {
        e.stopPropagation();
        router.push(`/schedule/soccer/${division.id}`);
    }

    const getTeamsCount = async () => {
        const apiData = await API.graphql(
            { query: getDivisionWithTeams, 
            variables: { id: division.id }
        });
        console.log('See here', apiData.data.getDivision);
        setTeamCount(apiData.data.getDivision.Teams.items.length);
    }

    return (
    <>
      <tr onClick={(e) => clickedDivision(e)} class="bg-white border border-gray-400 cursor-pointer">
        <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {selectedDivision && selectedDivision.id === division.id && (
            <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
          )}
          {division.name}
        </th>
        <td class="text-center px-6 py-3">
          {convertLevelToFull(division.level)}
        </td>
        <td class="text-center text-lg px-6 py-3">
          {teamCount}
        </td>
        <td class="flex gap-4 pr-10 px-6 py-4 text-center justify-center">
          <div className='flex-grow'></div>
          <IconUsers onClick={(e) => gameScheduleNavigate(e, division)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="calendar-outline"></IconUsers>
        </td>
      </tr>
    </>
    )
}