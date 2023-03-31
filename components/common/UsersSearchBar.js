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

export default function UsersSearchBar({ openModal, setOpenModal }) {
    const [users, setUsers] = useState([]);

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(); //Required for fetching in AWS Cognito


    useEffect(() => {
        const fetchUsers = async () => {
            var params = {
                UserPoolId: 'us-east-1_70GCK7G6t'
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

    const getUserImage = () => {

    }

    return (
        <>        
        {/* <!-- Dropdown menu --> */}
        <div id="dropdownUsers" class="z-[75] absolute top-[2rem] border border-gray-500 right-0 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
        <ul class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                Jese Leos
            </a>
            </li>
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Jese image" />
                Robert Gough
            </a>
            </li>
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                Bonnie Green
            </a>
            </li>
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Jese image" />
                Leslie Livingston
            </a>
            </li>
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Jese image" />
                Michael Gough
            </a>
            </li>
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Jese image" />
                Joseph Mcfall
            </a>
            </li>
                <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                Roberta Casas
            </a>
            </li>
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img class="w-6 h-6 mr-2 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                Neil Sims
            </a>
            </li>
        </ul>
        <a href="#" class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
            <svg class="w-5 h-5 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
            Add new user
        </a>
        </div>
        <div onClick={(e) => setOpenModal(false)} class='z-[50] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
        </>
    )
}