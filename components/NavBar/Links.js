/**
 * Last updated: 2023-03-12
 * 
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import Link from 'next/link'
import React from 'react'
import SportsDropDown from './SportsDropDown'
import { IconHome, IconShieldChevron, IconSettings } from '@tabler/icons-react';
import ScheduleDropDown from './ScheduleDropDown';
import RostersDropDown from './RostersDropDown';

const NavbarSetup = () => {
  return (
    <div className="flex flex-col font-medium text-lg">
      <Link href="./" className="flex flex-row p-2 text-neutral-500 hover:text-neutral-50">
          <div className="pt-1 ">
            <IconHome size={'1.3em'}/>
        </div>
        <p className="pl-2">Home</p>
      </Link>
      <SportsDropDown/>
      <ScheduleDropDown/>
      <RostersDropDown/>
      <Link href="./" className="flex flex-row p-2 text-neutral-500 hover:text-neutral-50">
        <div className="pt-1 ">
          <IconShieldChevron size={'1.3em'}/>
        </div>
        <p className="pl-2">Admin Portal</p>
      </Link>
      <Link href="./" className="flex flex-row p-2 text-neutral-500 hover:text-neutral-50">
        <div className="pt-1 ">
          <IconSettings size={'1.3em'}/>
        </div>
        <p className="pl-2">Settings</p>
      </Link>
    </div>
  )
}

export default NavbarSetup