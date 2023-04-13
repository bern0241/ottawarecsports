/**
 * Last updated: 2023-04-06
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES: https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_Operations.html
// https://flowbite.com/docs/components/dropdowns/
// https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/buttons/
// https://flowbite.com/docs/components/tables/
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s
// https://flowbite.com/docs/forms/search-input/
// https://tabler.io/icons

 import React, { useState, useEffect } from 'react';
 import { IconTrash, IconEdit } from '@tabler/icons-react';
 import { useRouter } from 'next/router';
 import { getImageFromS3, uniqueByUsername } from '@/utils/graphql.services';
 import AWS from 'aws-sdk';
import DeleteTeamModal from './DeleteTeamModal';
import Link from 'next/link';
  
  export default function TeamCard({ team, fetchTeams, filterTeams }) {
      const [deleteModal, setDeleteModal] = useState(false);
      const [captains, setCaptains] = useState([]);
      const [sport, setSport] = useState('Soccer');
      const [teamImage, setTeamImage] = useState(null);
      const router = useRouter();
 
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
 
      // Fetches captains and image on startup (when filterTeams loads)
      useEffect(() => {
         fetchCaptains(team.captains);
         getTeamImage();
      }, [filterTeams])
 
      // Fetches all captains from a team, and converts them to Cognito user (displays their name)
      const fetchCaptains = async (myCaptains) => {
         if (myCaptains === null) {
            setCaptains([]);
            return;
         }
         setCaptains([]);
         myCaptains.forEach(async captain => {
             const params = {
                 Username: captain,
                 UserPoolId: 'us-east-1_70GCK7G6t'
             }
             cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
                 if (err) console.log(err, err.stack); // an error occurred
                 else     {
                     // setCaptains(data);
                     setCaptains((captains) => {
                         return uniqueByUsername([...captains, data]);
                     } );
                     // return;
                 }          
             });
         })
     }
 
     // Fetches the team image from backend IF team picture exists
      const getTeamImage = async () => {
       if (team.team_picture === null || team.team_picture === '') {
           setTeamImage(null);
       } else {
           const url = await getImageFromS3(team.team_picture);
           setTeamImage(url);
       }
   }

   // Redirects user to team's page (where they can edit the team)
      const editTeamFunc = (e) => {
          e.stopPropagation();
          router.push(`/teams/${team.id}`)
      }
      // Open delete team modal
      const deleteTeamFunc = (e) => {
          e.stopPropagation();
          setDeleteModal(!deleteModal);
      }
      // Go to selected team's profile page
      const goToTeamPage = (e) => {
          e.preventDefault();
          router.push(`/teams/${team.id}`)
      }
      // Go to captain's player profile page
      const handleClickForLink = (e, captain) => {
          e.stopPropagation();
      }
  
      return (
          <>
          <tr onClick={(e) => goToTeamPage(e)} className="bg-white border border-gray-400 cursor-pointer">
                  <th scope="row" className="relative px-1 sm:px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className='mr-auto sm:flex gap-2 items-center flex-col sm:flex-row'>
                        <img
                            style={{ objectFit: 'cover' }}
                            width={132}
                            height={132}
                            className="w-[4.2rem] h-[4.2rem] rounded-full shadow-md border border-black mx-auto sm:mx-0"
                            src={`${teamImage ? teamImage : "/images/defaultProfilePic.jpeg"}`}
                            alt={`Teams profile image for ${team.name}`}
                        />
                        <p className='text-center'>{team.name}</p>
                        </div>
                  </th>
                  <td className="text-center py-3">
                    <ul className=''>
                      {captains && captains.map((captain, index) => (
                        <li  key={index}>
                          <Link href={`/players/${captain.Username}`} onClick={(e) => handleClickForLink(e)} className='my-1 cursor-pointer text-blue-700 underline sm:w-[8rem] text-[.91rem] text-center'> {captain.UserAttributes.find(o => o.Name === 'name')['Value']} {captain.UserAttributes.find(o => o.Name === 'family_name')['Value']}</Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="text-center px-6 py-3">
                      {sport}
                  </td>
                  <td className="flex gap-2 px-6 py-4 text-center justify-center">
                      <IconEdit onClick={(e) => editTeamFunc(e)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconEdit>
                  </td>
                  </tr>
          {deleteModal && (
              <DeleteTeamModal team={team} fetchTeams={fetchTeams} setDeleteModal={setDeleteModal} />
          )}
      </>
      )
  }