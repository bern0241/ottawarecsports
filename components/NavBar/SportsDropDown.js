import Link from 'next/link'
import React, { useState } from 'react'
import {MdOutlineSportsSoccer, MdKeyboardArrowRight, MdKeyboardArrowDown} from "react-icons/md";


const SportsDropDown = () => {
  const [showMe, setShowMe] = useState(false);
    function toggle(){
    setShowMe(!showMe);
}
  return (
    <div className="text-neutral-500 hover:text-neutral-50 focus:hover:text-neutral-50">
      <button onClick={toggle} className="flex flex-row p-2 ">
        <div className="pt-1 ">
          <MdOutlineSportsSoccer size={'1.3em'}/>
        </div>
        <h1 className=" font-medium text-lg pl-2">Sports</h1>  
        <div className="pt-1">
          {showMe?<MdKeyboardArrowRight size={'1.3em'}/>:<MdKeyboardArrowDown size={'1.3em'}/>}
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