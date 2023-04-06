import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API } from 'aws-amplify';
import AWS from 'aws-sdk';
import { createPlayerOnTeam } from '@/utils/graphql.services';
import MemberCardAdd from './MemberCardAdd';

export default function AddMemberDropdown({ fetchPlayersFromTeam, setOpenDropdown, members }) {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchClicked, setSearchClicked] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const router = useRouter();
    const {id} = router.query;
 
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

    useEffect(() => {
      if (search === '') {
        console.log('empty');
        setSearchClicked('');
      }
    }, [search])
  
    // Called when a MemberCardAdd is selected
    const setUserFunc = (e, user) => {
        e.preventDefault();
        if (selectedUsers.includes(user.Username)) {
          const array = selectedUsers.filter(item => item !== user.Username);
          setSelectedUsers(array);
        } else {
            setSelectedUsers((selectedUsers) => [...selectedUsers, user.Username]);
        }
    }

    const createPlayersFunc = async (e) => {
        e.preventDefault();
        if (selectedUsers.length === 0) return;

        selectedUsers.forEach(async (username) => {
             await createPlayerOnTeam(username, id);
        })
        await fetchPlayersFromTeam();
        setOpenDropdown(false);
    }

    const returnUserExists = (user) => {
        let founded = false;
        members.forEach((member) => {
          if (member.user_id === user.Username) {
            founded = true;
          }
      })
      return founded;
    }

    const searchClickedFunc = (e) => {
        e.preventDefault();
        setSearchClicked(search);
    }

    return (
        <>
        {/* <!-- Dropdown menu --> */}
        <div id="dropdownSearch" class="z-[300] border border-gray-500 absolute bg-white rounded-lg shadow-md w-[27rem] dark:bg-gray-700 right-0">
        <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
        <div class="relative flex flex-row items-center gap-2">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="input-group-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search players" />
            <button onClick={(e) => searchClickedFunc(e)} type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-900">Search</button>
        </div>
      </div>
          <ul class="h-[20rem] py-2 overflow-y-auto text-gray-700 dark:text-gray-200 border m-3" aria-labelledby="dropdownUsersButton">
            
            {users && users.filter((user) => {
                const searchItem = searchClicked.toLocaleLowerCase();
                const v = `${user.Attributes.find(o => o.Name === 'name')['Value'].toLocaleLowerCase()} ${user.Attributes.find(o => o.Name === 'family_name')['Value'].toLocaleLowerCase()}`
                if (!searchItem) return true;
                return v.startsWith(searchItem);
            })
            .map((user) => (
                <>
                {(returnUserExists(user)) ? (
                  <li>
                      {/* <TeamCardAdd search={searchClicked} team={team} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} teamDivisions={teamDivisions} /> */}
                  </li>
                ) : (
                  <li className='cursor-pointer' onClick={(e) => setUserFunc(e, user)}>
                      <MemberCardAdd search={searchClicked} user={user} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} members={members} />
                  </li>
                )}
                </>
            ))}
      
            
            {users.length === 0 && (
              <div>
                <p className='p-5 py-0 text-sm'>There are currently no users.</p>
              </div>
            )}
          </ul>

          <div className='flex flex-row justify-between items-center bg-gray-50 border-t dark:border-gray-600 '>
          <a href="/admin-portal/teams" class="flex items-center p-3 text-sm font-medium text-blue-600">
              <svg class="w-5 h-5 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
              Add new player
          </a>
          <div className='mr-3'>
          <button onClick={(e) => setOpenDropdown(false)} type="button" class="text-black font-medium text-sm px-10 py-2.5 mr-2 my-2 ">Cancel</button>
          <button onClick={(e) => createPlayersFunc(e)} type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 mr-2 my-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-900">Add</button>
          </div>
          </div>

          </div>
          <div onClick={(e) => setOpenDropdown(false)} class='z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
        </>
    )
}