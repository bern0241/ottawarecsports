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
          <tr
            key={team.id}
            className="border-b border-brand-neutral-300 cursor-pointer"
            onClick={(e) => goToTeamPage(e)}
          >
            <td className="pl-3 py-3">
              <div className="flex flex-col min-[590px]:flex-row sm:w-[80%] items-center pl-2 gap-2">
                <img
                  src={`${teamImage ? teamImage : "/images/defaultProfilePic.jpeg"}`}
                  width={132}
                  height={132}
                  className="rounded-full w-[82px] h-[82px] object-cover text-center"
                  alt={`Teams profile image for ${team.name}`}
                ></img>
                <p className='text-center min-[590px]:text-left ml-2 font-medium sm:w-[7rem]'>{team.name}</p>
                <div className='flex-grow'></div>
              </div>
            </td>
            <td className="text-center py-3">
              <ul className=''>
              {captains && captains.map((captain, index) => (
                        <li  key={index}>
                          <Link href={`/players/${captain.Username}`} onClick={(e) => handleClickForLink(e)} className='my-1 cursor-pointer text-blue-700 underline sm:w-[8rem] text-[.91rem] text-center'> {captain.UserAttributes.find(o => o.Name === 'name')['Value']} {captain.UserAttributes.find(o => o.Name === 'family_name')['Value']}</Link>
                        </li>
                      ))}
              </ul>
            </td>
            <td className="p-3 text-center">{sport}</td>
            <td className="flex gap-2 px-6 py-4 text-center justify-center">
              <div className="hidden sm:contents align-middle ">
                <IconEdit onClick={(e) => editTeamFunc(e)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="trash-outline" className="mt-5"></IconEdit>
                <IconTrash onClick={(e) => deleteTeamFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline" className="mt-5"></IconTrash>
              </div>
            </td>
          </tr>
          
          {deleteModal && (
              <DeleteTeamModal team={team} fetchTeams={fetchTeams} setDeleteModal={setDeleteModal} />
          )}
      </>
      )
  }