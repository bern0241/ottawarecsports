/**
 * Last updated: 2023-04-01
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import CoordinatorChip from '../../../admin-portal/leagues/LeagueTable/CoordinatorDropdown/CoordinatorChip';
import CoordinatorDropdown from '../../../admin-portal/leagues/LeagueTable/CoordinatorDropdown';
import { API } from '@aws-amplify/api';
import { createLeague, updateLeague } from '@/src/graphql/mutations';
import { listLeagues } from '@/src/graphql/queries';
import { listLeaguesLong } from '@/src/graphql/custom-queries';

export default function EditLeagueModal({ sport, league, setLeagues, setOpenModal, setSelectedLeague, getUserListByNames }) {
    const [leagueName, setLeagueName] = useState(league.name);
    const [leagueCoordinators, setLeagueCoordinators] = useState([]);
    const [numPerPeriod, setNumPerPeriod] = useState(league.number_of_periods);
    const [timePerPeriod, setTimePerPeriod] = useState(league.time_per_period);
    const [description, setDescription] = useState(league.description);

    const [openCoordinatorDrop, setOpenCoordinatorDrop] = useState(false);
    // const [listUsers, setListUsers] = useState([]);
    const [listUsersGroups, setListUsersGroups] = useState([]);
    const [message, setMessage] = useState(null);
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [message]);

    useEffect(() => {
        convertCoordinatorsToObject();
        fetchUsers();
    }, [])

    const convertCoordinatorsToObject = () => {
        league.coordinators.map((coordinator) => {
            const params = {
                Username: coordinator,
                UserPoolId: 'us-east-1_70GCK7G6t'
            }
            cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else   {
                    let data2 = {
                        name: `${data.UserAttributes.find(o => o.Name === 'name')['Value']} ${data.UserAttributes.find(o => o.Name === 'family_name')['Value']}`,
                        username: data.Username
                    }
                    setLeagueCoordinators((leagueCoordinators) => {
						return uniqueByUsernameSmall([...leagueCoordinators, data2]);
					} );
                } 
            });
        })
    }

    function uniqueByUsernameSmall(items) {
        const set = new Set();
        return items.filter((item) => {
          const isDuplicate = set.has(item.username);
          set.add(item.username);
          return !isDuplicate;
        });
    }

    
    // FETCH USERS (COORDINATORS)
    const fetchUsers = (e) => {
        var params = {
            UserPoolId: 'us-east-1_70GCK7G6t', /* required */
        };
        cognitoidentityserviceprovider.listUsers(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                setGroupsForEachUser(data.Users);
            }
        })
    }
    const setGroupsForEachUser = (_users) => {
        let users = _users;
        users.map((user) => {
            //Attributes - Groups
            var params = {
              Username: user.Username,
              UserPoolId: 'us-east-1_70GCK7G6t', /* required */
            };
              cognitoidentityserviceprovider.adminListGroupsForUser(params, function(err, data) {

              user.Groups = data.Groups.map(group => group.GroupName);
              setListUsersGroups((listUsersGroups) => 
              {
                  return uniqueByUsername([...listUsersGroups, user])
              });
            });
          })
      }

	function uniqueByUsername(items) {
		const set = new Set();
		return items.filter((item) => {
			const isDuplicate = set.has(item.Username);
			set.add(item.Username);
			return !isDuplicate;
		});
	}




    const updateLeagueFunc = async (e) => {
        e.preventDefault();
        if (leagueName === '') {
            setMessage({status: 'error', message: 'Please fill out all required field.'});
            return;
        }
        const coordinatorUsernames = leagueCoordinators.map(a => a.username)
        try{
            const data = {
                id: league.id,
                name: leagueName,
                // sport: sport,
                // date_founded: new Date(),
                // cost_per_individual: 32,
                // cost_per_team: 328,
                coordinators: coordinatorUsernames,
                description: description,
                number_of_periods: numPerPeriod,
                time_per_period: timePerPeriod,
            }
            const apiData = await API.graphql({
                query: updateLeague,
                variables: { input: data},
            });
            setMessage({status: 'success', message: 'League updated successfully!'});
            listLeaguesFunc2(apiData.data.updateLeague);
            setOpenModal(false);
        } catch (error) {
            setMessage({status: 'error', message: error.message});
            console.error(error);
        }

    }

    const listLeaguesFunc2 = async (updateLeague) => {
        const timer = setTimeout(async () => {
            
        const variables = {
                filter: {
                  sport: {
                    eq: sport
                  }
                }
              };
              const leagues = await API.graphql({ 
                query: listLeagues, variables: variables
              });
            //   console.log('Leagues', leagues.data.listLeagues.items);
              
              setLeagues(leagues.data.listLeagues.items);
              getUserListByNames(updateLeague.coordinators);
              setSelectedLeague(updateLeague);
              setOpenModal(false);
            }, 500);
            return () => clearTimeout(timer);
        }


    return (
        <>
    {/* // <!-- Main modal --> */}
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-[1rem] left-0 right-0 z-[220] p-4 w-[32rem] mx-auto">
        <div className="relative w-full h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                        Edit League
                    </h3>
                    <button onClick={() => setOpenModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
    
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">League Name *</label>
                        <input value={leagueName} onChange={(e) => setLeagueName(e.target.value)} type="text" id="name" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    
                    <div className='relative cursor-pointer' onClick={() => setOpenCoordinatorDrop(!openCoordinatorDrop)}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coordinator</label>
                        <input value='' disabled type="text" id="name" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" />
                        <div className='absolute right-2 top-[2.8rem]'>
                            <ion-icon style={{fontSize: '25px'}} name="caret-down-circle-outline"></ion-icon>
                        </div>
                        <div className='flex absolute top-[2.3rem]'>
                            {leagueCoordinators && leagueCoordinators.map((coordinator) => (
                                <>
                                    <CoordinatorChip coordinator={coordinator} leagueCoordinators={leagueCoordinators} setLeagueCoordinators={setLeagueCoordinators} />
                                </>
                            ))}
                        </div>
                    </div>
                        {openCoordinatorDrop && (
                            <>
                            <CoordinatorDropdown openDropdown={openCoordinatorDrop} setOpenDropdown={setOpenCoordinatorDrop} leagueCoordinators={leagueCoordinators} setLeagueCoordinators={setLeagueCoordinators} listUsers={listUsersGroups} />
                            <div onClick={(e) => setOpenCoordinatorDrop(false)} className='z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
                            </>
                        )}
    
                    <div className='flex justify-between'>
                    <div>
                        <label htmlFor="numPerPeriod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Period</label>
                        <input onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }} value={numPerPeriod} onChange={(e) => setNumPerPeriod(e.target.value)} type="text" id="numPerPeriod" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="timePerPeriod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time per Period</label>
                        <input onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }} value={timePerPeriod} onChange={(e) => setTimePerPeriod(e.target.value)} type="text" id="timePerPeriod" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    </div>
    
    
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">League Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                    </div>
    
                    {message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                    
                </div>
    
                {/* <!-- Modal footer --> */}
                <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                    <button onClick={(e) => updateLeagueFunc(e)} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    </div>
        <div onClick={(e) => setOpenModal(false)} className='z-[200] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
    </>
        )
}