/**
 * Last updated: 2023-03-13
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react'
import BreadCrumbs from './BreadCrumbs'

const HeaderTitle = () => {
  return (
    <div className="p-1">
      <BreadCrumbs/>
      <p className="font-semibold text-lg">Title of Page</p>
    </div>
  )
}

export default HeaderTitle