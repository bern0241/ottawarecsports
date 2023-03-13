/**
 * Last updated: 2023-03-13
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react'
import Header from '../Header'
import NavbarMenu from '../NavBar'

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <Header/>
      <div className="grid md:grid-cols-sidebar">
        <NavbarMenu/>
      </div>
    </div>
  )
}

export default Layout