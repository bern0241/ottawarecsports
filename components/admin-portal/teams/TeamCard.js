/**
 * Last updated: 2023-04-06
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

 import React, { useState, useEffect } from 'react';
 import { IconTrash, IconEdit, IconCut } from '@tabler/icons-react';
 import { useRouter } from 'next/router';
 import { getImageFromS3, uniqueByUsername } from '@/utils/graphql.services';
 import AWS from 'aws-sdk';
import DeleteTeamModal from './DeleteTeamModal';
  
  export default function TeamCard({ team, fetchTeams, filterTeams }) {
      const [editModal, setEditModal] = useState(false);
      const [deleteModal, setDeleteModal] = useState(false);
      const [captains, setCaptains] = useState([]);
      const [sport, setSport] = useState('Soccer');
      const [teamImage, setTeamImage] = useState(null);
      const router = useRouter();
 
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
 
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
 
     // Fetches the team image from
      const getTeamImage = async () => {
       if (team.team_picture === null || team.team_picture === '') {
           setTeamImage(null);
       } else {
           const url = await getImageFromS3(team.team_picture);
           console.log('URL',url);
           setTeamImage(url);
       }
   }
  
      const editTeamFunc = (e) => {
          e.stopPropagation();
          router.push(`/teams/${team.id}`)
        //   setEditModal(!editModal);
      }
      
      const deleteTeamFunc = (e) => {
          e.stopPropagation();
          setDeleteModal(!deleteModal);
      }
  
      const goToTeamPage = (e) => {
          e.preventDefault();
          router.push(`/teams/${team.id}`)
      }
      
      const goToPlayerPage = (e, captain) => {
          e.stopPropagation();
          router.push(`/players/${captain.Username}`)
      }
  
      return (
          <>
          <tr onClick={(e) => goToTeamPage(e)} class="bg-white border border-gray-400 cursor-pointer">
                  <th scope="row" class="relative px-1 sm:px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className='mr-auto sm:flex gap-2 items-center flex-col sm:flex-row'>
                        <img
                            style={{ objectFit: 'cover' }}
                            width={132}
                            height={132}
                            className="w-[4.2rem] h-[4.2rem] rounded-full shadow-md border border-black mx-auto sm:mx-0"
                            src={`${teamImage ? teamImage : "/images/defaultProfilePic.jpeg"}`}
                        />
                        <p className='text-center'>{team.name}</p>
                        </div>
                  </th>
                  <td class="text-center py-3">
                  {captains && captains.map((captain, index) => (
                     // <>
                     <p className='cursor-pointer text-blue-500 underline' onClick={(e) => goToPlayerPage(e, captain)} key={index}>{captain.UserAttributes.find(o => o.Name === 'name')['Value']} {captain.UserAttributes.find(o => o.Name === 'family_name')['Value']}</p>
                 ))}
                  </td>
                  <td class="text-center px-6 py-3">
                      {sport}
                  </td>
                  <td class="flex gap-2 px-6 py-4 text-center justify-center">
                      <IconEdit onClick={(e) => editTeamFunc(e)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconEdit>
                      <IconTrash onClick={(e) => deleteTeamFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconTrash>
                  </td>
                  </tr>
          
          {deleteModal && (
              <DeleteTeamModal team={team} fetchTeams={fetchTeams} setDeleteModal={setDeleteModal} />
          )}
      </>
      )
  }