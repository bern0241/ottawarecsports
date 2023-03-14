/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react'
import Profile from './Profile'
import HeaderTitle from './Title'

const Header = () => {
  return (
  <>
  <div className="w-full h-16 flex flex-row items-center justify-between border-b-2 border-brand-blue-900/25 top-0 right-0">
    <HeaderTitle className="ml-4"/>
    <div className="flex-grow"></div>
    <Profile className="ml-auto"/>
  </div>
  </>
  )
}

export default Header