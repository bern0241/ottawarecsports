// https://flowbite.com/docs/components/dropdowns/

/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 * Greg Coghill <cogh0020@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */


import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import UserCard from '../teams/UserCard';

export default function UsersSearchBar({ openDropdown, setOpenDropdown, setMembers, fetchPlayersFromTeam }) {
    const [users, setUsers] = useState([]);

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(); //Required for fetching in AWS Cognito


    useEffect(() => {
        const fetchUsers = async () => {
            var params = {
                UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID
            };
            cognitoidentityserviceprovider.listUsers(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    setUsers(data.Users);
                }
            });
        };
        fetchUsers();
    }, [])

    return (
        <>        
        {/* <!-- Dropdown menu --> */}
        <div id="dropdownUsers" className="z-[75] absolute top-[2rem] border border-gray-500 right-0 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
        <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
            {users && users.map((user) => (
              <li key={user.Username}>
                <UserCard user={user} setMembers={setMembers} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} fetchPlayersFromTeam={fetchPlayersFromTeam} />
              </li>
            ))}
        </ul>
        </div>
        <div onClick={(e) => setOpenDropdown(false)} className='z-[50] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
        </>
    )
}