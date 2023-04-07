import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { listTeams } from '@/src/graphql/queries';
import { useUser } from '@/context/userContext';
import TeamTable from '@/components/admin-portal/teams/TeamTable';
import SearchBarInput from '@/components/common/SearchBarInput';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';

export default function ACPTeamsPage() {
    const [user, setUser, authRoles, setAuthRoles] = useUser();
    const [teams, setTeams] = useState([]);
    const [filterTeams, setFilterTeams] = useState('');
    const router = useRouter();

    useEffect(() => {
		fetchTeams();
	}, []);

    const fetchTeams = async () => {
        const teams = await API.graphql({
            query: listTeams
        })
        // console.log('Teams', teams.data.listTeams.items);
        setTeams(teams.data.listTeams.items);
        setFilterTeams(teams.data.listTeams.items);
      }

     /**
	 * Filter teams by name using the search input value.
	 * @param {[Object]} ev Click event
	 */
	function handleSearch(ev) {
		ev.preventDefault();
		let searchValue = document
			.getElementById('team-search')
			.value.toLowerCase();

		let filteredTeams = teams.filter((team) => {
			// Reference: Stack Overflow/zb22 <https://stackoverflow.com/questions/66089303/how-to-filter-full-name-string-properly-in-javascript>
			const arr = searchValue.split(' ');
			return arr.some((el) => team.name.toLowerCase().includes(el));
		});

		setFilterTeams(filteredTeams);
	}


    if (!user || (!authRoles.includes('Admin') && !authRoles.includes('Owner'))) {
     return (
         <div className="flex items-center justify-center h-[50vh]">
             <h2>You do not have access for this page</h2>
         </div>
     );
 }

    return (
        <>
            <Head>
                <title>Ottawa Rec Sports</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/ORS-Logo.png" />
            </Head>

            <main className='w-full flex justify-center max-w-[70em] mx-auto'>
                <div className="flex flex-col w-full mt-[2.4rem]">
                
                <div className='ml-3'>
                <SearchBarInput
					id={'team-search'}
					placeholder={'Search'}
					searchFunction={handleSearch}
				/>
                </div>
                      <TeamTable filterTeams={filterTeams} fetchTeams={fetchTeams} />
                </div>
            </main>
        </>
    );
}