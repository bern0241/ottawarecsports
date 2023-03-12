import Link from 'next/link'
import React from 'react'
import SportsDropDown from './SportsDropDown'
import {MdOutlineHome, MdAdminPanelSettings, MdSettings} from "react-icons/md";
import ScheduleDropDown from './ScheduleDropDown';
import RostersDropDown from './RostersDropDown';

const NavbarSetup = () => {
  return (
    <div className="flex flex-col font-medium text-lg">
      <Link href="./" className="flex flex-row p-2 text-neutral-500 hover:text-neutral-50">
          <div className="pt-1 ">
            <MdOutlineHome size={'1.3em'}/>
        </div>
        <p className="pl-2">Home</p>
      </Link>
      <SportsDropDown/>
      <ScheduleDropDown/>
      <RostersDropDown/>
      <Link href="./" className="flex flex-row p-2 text-neutral-500 hover:text-neutral-50">
        <div className="pt-1 ">
          <MdAdminPanelSettings size={'1.3em'}/>
        </div>
        <p className="pl-2">Admin Portal</p>
      </Link>
      <Link href="./" className="flex flex-row p-2 text-neutral-500 hover:text-neutral-50">
        <div className="pt-1 ">
          <MdSettings size={'1.3em'}/>
        </div>
        <p className="pl-2">Settings</p>
      </Link>
    </div>
  )
}

export default NavbarSetup