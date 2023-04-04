/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { useRouter } from 'next/router';
import {IconUsers} from '@tabler/icons-react';

export default function LeagueCard({ league, sport, selectedLeague, setSelectedLeague, setLeagues }) {
    const [users, setUsers] = useState([]);
    const router = useRouter();
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    useEffect(()=> {
        setUsers([]);
        getUserListByNames();
    }, [])

    const getUserListByNames = () => {
        league.coordinators.forEach((coordinator) => {
            var params = {
                UserPoolId: 'us-east-1_70GCK7G6t',
                Username: coordinator 
              };
              setUsers([]);
              cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                // else     console.log(data);           // successful response
                    setUsers((users) => {
                        return uniqueByUsername([...users, data]);
                    });
            });
        });
    }

    function uniqueByUsername(items) {
        const set = new Set();
        return items.filter((item) => {
          const isDuplicate = set.has(item.Username);
          set.add(item.Username);
          return !isDuplicate;
        });
    }

    const goToUserPage = (e, username) => {
        e.stopPropagation();
        router.push(`/players/${username}`)
    }

    const clickedLeague = (e) => {
        e.preventDefault();
        setSelectedLeague(league);
    }

    return (
        <>
        <tr onClick={(e) => clickedLeague(e)} class="bg-white border border-gray-400 cursor-pointer">
            <th scope="row" class="relative px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {selectedLeague && selectedLeague.id === league.id && (
                    <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
                )}
                {league.name}
            </th>
            <td class="px-6 py-3">
                <ul>
                    {users && users.map((coordinator) => (
                        <>
                        <li className="text-blue-700 text-sm">
                        <p onClick={(e) => goToUserPage(e, coordinator.Username)}>{coordinator.UserAttributes.find(o => o.Name === 'name')['Value']} {coordinator.UserAttributes.find(o => o.Name === 'family_name')['Value']}</p>
                        </li>
                        </>
                    ))}
                </ul>
            </td>
            <td class="flex gap-4 px-6 py-3 text-center justify-center">
              <IconUsers style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="people"></IconUsers>
            </td>
        </tr>
    </>
    )
}