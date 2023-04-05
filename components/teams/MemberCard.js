import React, { useState, useEffect } from 'react'
import { IconX } from '@tabler/icons-react';
import AWS from 'aws-sdk';
import { useRouter } from 'next/router';
import DeletePlayerModal from './DeletePlayerModal';
import ChoosePlayerRole from './ChoosePlayerRole';

export default function MemberCard({ member, fetchPlayersFromTeam }) {
    const [user, setUser] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [newRole, setNewRole] = useState('');
    const [changeRoleModal, setChangeRoleModal] = useState(false);
    const router = useRouter();
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    useEffect(() => {
        if (member) {
            const params = {
                Username: member.user_id,
                UserPoolId: 'us-east-1_70GCK7G6t'
            }
            cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     {
                    setUser(data);
                    console.log('DATA',data);
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
            {user && user.UserAttributes.find(o => o.Name === 'name')['Value']} {' '}
            {user && user.UserAttributes.find(o => o.Name === 'family_name')['Value']}
        </p>
        <ChoosePlayerRole clickStopPropagationFunc={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }} 
                currentRole={member.role} 
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
    </>
  )
}
