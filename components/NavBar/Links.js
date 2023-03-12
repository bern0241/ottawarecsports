import Link from 'next/link'
import React from 'react'
import SportsDropDown from './SportsDropDown'

const NavbarSetup = () => {
  return (
    <div class="flex flex-col font-medium text-lg">
      <Link href="./" class="flex flex-row">
        <p>Home</p>
      </Link>
      <SportsDropDown/>
      <Link href="./">Schedule</Link>
      <Link href="./">Rosters</Link>
      <Link href="./">Admin Portal</Link>
      <Link href="./">Settings</Link>
    </div>
  )
}

export default NavbarSetup