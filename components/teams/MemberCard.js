import React, { useState, useEffect } from 'react'
import { IconX } from '@tabler/icons-react';
import AWS from 'aws-sdk';
import DeletePlayerModal from './DeletePlayerModal';

export default function MemberCard({ member, fetchPlayersFromTeam }) {
    const [user, setUser] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

    const deletePlayerModal = (e) => {
        e.preventDefault();
        setOpenDeleteModal(!openDeleteModal);
    }

  return (
    <>
    <p className='text-black'>
        {user && user.UserAttributes.find(o => o.Name === 'name')['Value']} {' '}
        {user && user.UserAttributes.find(o => o.Name === 'family_name')['Value']}
    </p>
    <button className="text-brand-orange-800" onClick={(e) => deletePlayerModal(e)}>
        <IconX/>
    </button>
    {openDeleteModal && (
        <DeletePlayerModal player={member} user={user} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} fetchPlayersFromTeam={fetchPlayersFromTeam} />
    )}
    </>
  )
}
