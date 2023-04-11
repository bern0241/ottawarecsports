/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import EditLeagueModal from '../../../common/sports/Leagues/EditLeagueModal';
import DeleteLeagueModal from '../../../common/sports/Leagues/DeleteLeagueModal';
import { useRouter } from 'next/router';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function LeagueCard({ league, sport, selectedLeague, setSelectedLeague, setLeagues, listLeaguesFunc }) {
    const [users, setUsers] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const router = useRouter();
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    useEffect(()=> {
      getUserListByNames(league.coordinators);
  }, [])
  
  /**
   * Gets all Coordinators of the league, retrieves each name, and displays them.
   * @param {*} coordinators List of coordinators (their Cognito Usernames)
   */
  const getUserListByNames = (coordinators) => {
      setUsers([]);
      coordinators.forEach((coordinator) => {
          var params = {
              UserPoolId: 'us-east-1_70GCK7G6t',
              Username: coordinator 
              };
              cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              // else     console.log(data);           // successful response
                  setUsers((users) => {
                      return uniqueByUsername([...users, data]);
                  });
          });
      });
  }

    /**
     * Makes each item unique - removes any duplicates by Cognito Username
     * @param {*} items Array of items (objects)
     * @returns 
     */
    function uniqueByUsername(items) {
        const set = new Set();
        return items.filter((item) => {
          const isDuplicate = set.has(item.Username);
          set.add(item.Username);
          return !isDuplicate;
        });
    }
    // When a Coordinator's name is selected, goes to that user's Player page.
    const goToUserPage = (e, username) => {
        e.stopPropagation();
        router.push(`/players/${username}`)
    }
    // Selects a league
    const clickedLeague = (e) => {
        e.preventDefault();
        setSelectedLeague(league);
    }
    // Opens edit league modal
    const editLeagueFunc = (e) => {
        e.stopPropagation();
        setEditModal(!editModal);
    }
    // Opens delete league modal
    const deleteLeagueFunc = (e) => {
      e.stopPropagation();
      setDeleteModal(!deleteModal);
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
                <ul className='text-center'>
                    {users && users.map((coordinator) => (
                        <>
                        <li className="text-blue-700 text-sm underline py-[.2rem]">
                        <p onClick={(e) => goToUserPage(e, coordinator.Username)}>{coordinator.UserAttributes.find(o => o.Name === 'name')['Value']} {coordinator.UserAttributes.find(o => o.Name === 'family_name')['Value']}</p>
                        </li>
                        </>
                    ))}
                </ul>
            </td>
            <td className="px-6 py-3 text-center">
                {league.sport}
            </td>
            <td class="flex gap-4 px-6 py-3 text-center justify-center">
                <div className='flex-grow'></div>
                <IconEdit onClick={(e) => editLeagueFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></IconEdit>
                <IconTrash onClick={(e) => deleteLeagueFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></IconTrash>
            </td>
        </tr>

        {editModal && (
            <EditLeagueModal league={league} setOpenModal={setEditModal} sport={sport} setLeagues={setLeagues} setSelectedLeague={setSelectedLeague} getUserListByNames={getUserListByNames} />
        )}
        {deleteModal && (
            <DeleteLeagueModal leagueInfo={league} setDeleteModal={setDeleteModal} listLeaguesFunc={listLeaguesFunc} />
        )}
        
    </>
    )
}