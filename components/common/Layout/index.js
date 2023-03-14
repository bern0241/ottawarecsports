/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react'
import Image from 'next/image';
import Header from '../Header'
import NavbarMenu from '../NavBar'
import {IconMenu2 } from '@tabler/icons-react';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(menuOpen);
  function showMenu() {
    setMenuOpen(!menuOpen)
  }
  return (
    <>
    {menuOpen?
    <div>
      <NavbarMenu showMenu={menuOpen} showMenu={showMenu}/>
      <div className="w-100">
        <div className="w-full h-20 flex flex-row items-center bg-brand-blue-900 top-0 right-0 pl-2 pr-12">
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
    </div>:
    <div>
      <div className="w-full h-20 flex flex-row items-center bg-brand-blue-900 top-0 right-0 pl-2 pr-12">
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
    }
    </>
  )
}

export default Layout