/**
 * Last updated: 2023-03-13
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react'
import Profile from './Profile'
import HeaderTitle from './Title'
import { IconX, IconMenu2 } from '@tabler/icons-react';
import NavbarMenu from '../NavBar';

const Header = () => {
  return (
    <div className="">
      <div className="hidden">
        <IconX/>
        <IconMenu2/>
      </div>
      <NavbarMenu/>
      <div className="fixed w-9/12 px-5 py-2 flex flex-row justify-between items-center border-b-2 border-brand-blue-900/25 top-0 right-0 ">
        <HeaderTitle/>
        <Profile/>
      </div>
    </div>
  )
}

export default Header