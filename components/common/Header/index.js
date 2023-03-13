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
const Header = () => {
  return (
  <div className="fixed w-full grow px-5 py-2 pl-80 flex flex-row justify-between items-strech border-b-2 border-brand-blue-900/25 top-0 right-0 ">
    <div className="hidden">
      <IconX/>
      <IconMenu2/>
    </div>
    <HeaderTitle/>
    <div className="flex-grow"></div>
    <Profile className="ml-auto"/>
  </div>
  )
}

export default Header