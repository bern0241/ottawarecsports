import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API } from 'aws-amplify';
import { listTeams } from '@/src/graphql/queries';
import { createTeamDivision, deleteTeamDivision } from '@/src/graphql/mutations';
import { listTeamsShort } from '@/src/graphql/custom-queries';
import TeamCardAdd from './TeamCardAdd';

export default function AddTeamDropdown({ listTeamDivisionsFunc, setOpenDropdown, teamDivisions }) {
    const [search, setSearch] = useState('');
    const [searchClicked, setSearchClicked] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const router = useRouter();
    const {divisionID} = router.query;

    useEffect(() => {
        fetchTeams();
    }, [])

    useEffect(() => {
      if (search === '') {
        setSearchClicked('');
      }
    }, [search])

    const fetchTeams = async () => {
        const teams = await API.graphql({
            query: listTeamsShort
        })
        // console.log('Teams', teams.data.listTeams.items);
        setTeams(teams.data.listTeams.items);
    }

    const setTeamFunc = (e, team) => {
        e.preventDefault();
        if (selectedTeams.includes(team.id)) {
          const array = selectedTeams.filter(item => item !== team.id);
          setSelectedTeams(array);
        } else {
          setSelectedTeams((selectedTeams) => [...selectedTeams, team.id]);
        }
    }

    const createTeamDivisionsFunc = async (e) => {
        e.preventDefault();

        if (selectedTeams.length === 0) return;

        selectedTeams.forEach(async (teamID) => {
              let data = {
                  divisionId: divisionID,
                  teamId: teamID,
              }
              let newTeamDivision = await API.graphql({
                  // query: createTeamDivisionShort,
                  query: createTeamDivision,
                  variables: { input: data },
              });
          })
            // setMessage({status: 'success', message: 'League and coordinators successfully created.'});
        listTeamDivisionsFunc();
        setOpenDropdown(false);
    }

    const returnTeamExists = (team) => {
        let founded = false;
        teamDivisions.forEach((teamDiv) => {
          if (teamDiv.team.id === team.id) {
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
        <div id="dropdownSearch" className="z-[300] border border-gray-500 absolute bg-white rounded-lg shadow-md w-[27rem] dark:bg-gray-700 right-0 top-[7rem]">
        <div className="p-3">
      <label htmlFor="input-group-search" className="sr-only">Search</label>
        <div className="relative flex flex-row items-center gap-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setSearchClicked(e.target.value)
          }
        }} value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search teams" />
            <button onClick={(e) => searchClickedFunc(e)} type="button" className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-900">Search</button>
        </div>
      </div>
          <ul className="h-[20rem] py-2 overflow-y-auto text-gray-700 dark:text-gray-200 border m-3" aria-labelledby="dropdownUsersButton">
            
            {teams && teams.filter((team) => {
                const searchItem = searchClicked.toLocaleLowerCase();
                const v = `${team.name.toLocaleLowerCase()}`
                if (!searchItem) return true;
                return v.startsWith(searchItem);
            })
            .map((team, index) => (
                <React.Fragment key={index}>
                {(returnTeamExists(team)) ? (
                  <li key={index}>
                      {/* <TeamCardAdd search={searchClicked} team={team} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} teamDivisions={teamDivisions} /> */}
                  </li>
                ) : (
                  <li className='cursor-pointer' onClick={(e) => setTeamFunc(e, team)}>
                      <TeamCardAdd search={searchClicked} team={team} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} teamDivisions={teamDivisions} />
                  </li>
                )}
                </React.Fragment>
            ))}
      
            
            {teams.length === 0 && (
              <div>
                <p className='p-5 py-0 text-sm'>There are currently no teams existing.</p>
              </div>
            )}
          </ul>

          <div className='flex flex-row justify-between items-center bg-gray-50 border-t dark:border-gray-600 '>
          <a href="/admin-portal/teams" className="flex items-center p-3 text-sm font-medium text-blue-600">
              <svg className="w-5 h-5 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
              Add new team
          </a>
          <div className='mr-3'>
          <button onClick={(e) => setOpenDropdown(false)} type="button" className="text-black font-medium text-sm px-10 py-2.5 mr-2 my-2 ">Cancel</button>
          <button onClick={(e) => createTeamDivisionsFunc(e)} type="button" className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 mr-2 my-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-900">Add</button>
          </div>
          </div>

          </div>
          <div onClick={(e) => setOpenDropdown(false)} className='z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
        </>
    )
}