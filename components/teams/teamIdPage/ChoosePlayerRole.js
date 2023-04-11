import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk'
import { updatePlayer } from '@/src/graphql/mutations'

export default function ChoosePlayerRole({ member, clickStopPropagationFunc, setChangeRoleModal, setNewRole, currentRole, setCurrentRole }) {
    const [open, setOpen] = useState(false);

    function changeRoleFunc(newRole) {
        if (newRole === currentRole) { setOpen(false); return; }
        setOpen(false);
        setChangeRoleModal(true);
        setNewRole(newRole);
    }

  return (
    <div>
    <button onClick={(e) => {
        clickStopPropagationFunc(e);
        e.stopPropagation();
        e.preventDefault();
        setOpen(!open);
        }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="border-gray-400 border-[1px] text-black bg-white hover:bg-gray-100 focus:ring-[2px] focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mx-3" type="button">{currentRole} <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

    {open && (
        <div id="dropdown" className="z-[500] absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 border border-gray-400">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <p onClick={(e) => {
                    clickStopPropagationFunc(e);
                    changeRoleFunc('Player');
                }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Player</p>
              </li>
              <li>
                <p onClick={(e) => {
                    clickStopPropagationFunc(e);
                    changeRoleFunc('Captain')
                }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Captain</p>
              </li>
            </ul>
        </div>
    )}
    {open && (
    <div onClick={(e) => {
        clickStopPropagationFunc(e);
        setOpen(false);
    }} className='z-[10] opacity-50 fixed top-0 left-0 w-[100%] h-[100%]' />
    )}
    </div>

  )
}