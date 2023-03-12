/**
 * Last updated: 2023-03-12
 * 
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import Link from 'next/link'
import React, { useState } from 'react'
import { IconBallFootball, IconChevronDown, IconChevronRight  } from '@tabler/icons-react';

const SportsDropDown = () => {
  const [showMe, setShowMe] = useState(false);
    function toggle(){
    setShowMe(!showMe);
}
  return (
    <div className="text-neutral-500 hover:text-neutral-50">
      <button onClick={toggle} className="p-2 flex flex-row justify-between w-full">
        <div className='flex flex-row align-middle'>
          <div className="pt-1 ">
          <IconBallFootball size={'1.3em'}/>
          </div>
          <h1 className=" font-medium text-lg pl-2">Sports</h1> 
        </div>  
        <div className="pt-1">
          {showMe?<IconChevronRight size={'1.3em'}/>:<IconChevronDown size={'1.3em'}/>}
        </div>
      </button>
      <div style={{
          display: showMe?"block":"none"
        }}>
        <div className="flex flex-col font-regular text-xs pl-10 bg-blue-100 text-neutral-900">
          <Link href="./" className="my-1 hover:font-bold focus:font-bold">Soccer</Link>
          <Link href="./" className="my-1 hover:font-bold focus:font-bold">Volleyball</Link>
          <Link href="./" className="my-1 hover:font-bold focus:font-bold">Multi-Sport</Link>
          <Link href="./" className="my-1 hover:font-bold focus:font-bold">Pick-up Sport</Link>
        </div>
      </div>
    </div>
  )
}

export default SportsDropDown