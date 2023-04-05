import React, { useState, useEffect } from 'react'
import { IconX } from '@tabler/icons-react';
import AWS from 'aws-sdk';
import { useRouter } from 'next/router';
import DeletePlayerModal from '../DeletePlayerModal';
import ChoosePlayerRole from './ChoosePlayerRole';
import ChangeRoleModal from './ChangeRoleModal';

export default function MemberCard({ member, fetchPlayersFromTeam, fetchCaptains }) {
    const [user, setUser] = useState();
    const [userName, setUserName] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [newRole, setNewRole] = useState('');
    const [changeRoleModal, setChangeRoleModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(member.role)
    const router = useRouter();
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    useEffect(() => {
        if (member) {
            if (member.role === null) {
                setCurrentRole('Player');
            }

            const params = {
                Username: member.user_id,
                UserPoolId: 'us-east-1_70GCK7G6t'
            }
            cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     {
                    setUser(data);
                    setUserName(`${data.UserAttributes.find(o => o.Name === 'name')['Value']}
                    ${data.UserAttributes.find(o => o.Name === 'family_name')['Value']}`);
                }          // successful response
            });
        }
    }, [member])

    const goToPlayerPage = (e) => {
        e.stopPropagation();
        router.push(`/players/${member.user_id}`)
    }

    const deletePlayerModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpenDeleteModal(!openDeleteModal);
    }

  return (
    <>
    <div onClick={(e) => goToPlayerPage(e)} className='flex flex-row justify-between w-full items-center cursor-pointer'>
        <p className='text-black'>
            {userName}
        </p>
        <ChoosePlayerRole clickStopPropagationFunc={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }} 
                currentRole={currentRole}
                member={member}
                setNewRole={setNewRole}
                setChangeRoleModal={setChangeRoleModal}
            />
        <button className="text-brand-orange-800" onClick={(e) => deletePlayerModal(e)}>
            <IconX/>
        </button>
    </div>
    {openDeleteModal && (
        <DeletePlayerModal player={member} user={user} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} fetchPlayersFromTeam={fetchPlayersFromTeam} />
    )}
    {changeRoleModal && (
        <ChangeRoleModal setOpenModal={setChangeRoleModal} member={member} userName={userName} newRole={newRole} setCurrentRole={setCurrentRole} fetchCaptains={fetchCaptains} />
    )}
    </>
  )
}
