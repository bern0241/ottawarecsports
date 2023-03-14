/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState} from 'react'
import Image from 'next/image';
import Header from '../Header'
import NavbarMenu from '../NavBar'
import {IconMenu2 } from '@tabler/icons-react';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  function showMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
    {menuOpen?
    <div className="h-screen relative z-0 flex bg-gray-500 sm:bg-transparent">
      <div className="w-full">
        <div className="w-full h-20 flex flex-row items-center bg-brand-blue-900 top-0 right-0 pl-2 pr-12 sm:hidden">
          <div className="self-start">
            <button className="visible center mt-4 mr-2" onClick={showMenu}>
              <IconMenu2 color="white" size={'3em'}/>
            </button>
          </div>
          <Image
                  src="/Logo.svg"
                  alt="ORS Logo"
                  width={66}
                  height={66}
                  priority
                  className="mx-auto"
                />
        </div>
        <Header/>
      </div>
      <div className="absolute inset-y-0 left-0 z-10">
        <NavbarMenu showMenu={menuOpen} showMenu={showMenu}/>
      </div>
    </div>:
    <div>
    <div>
      <div className="w-full h-20 flex flex-row items-center bg-brand-blue-900 top-0 right-0 pl-2 pr-12 sm:hidden">
        <div className="self-start">
          <button className="visible center mt-4 mr-2" onClick={showMenu}>
            <IconMenu2 color="white" size={'3em'}/>
          </button>
        </div>
        <Image
                src="/Logo.svg"
                alt="ORS Logo"
                width={66}
                height={66}
                priority
                className="mx-auto"
              />
      </div>
      <Header/>
    </div>
      <div className="absolute inset-y-0 left-0 z-10 hidden sm:block">
        <NavbarMenu showMenu={menuOpen} showMenu={showMenu}/>
      </div>
    </div>
    }
    </>
  )
}

export default Layout