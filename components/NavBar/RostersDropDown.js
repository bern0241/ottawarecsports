import React, { useState } from 'react'
import Link from 'next/link'
import {MdPeople, MdKeyboardArrowRight, MdKeyboardArrowDown} from "react-icons/md";

const RostersDropDown = () => {
  const [showMe, setShowMe] = useState(false);
    function toggle(){
    setShowMe(!showMe);
  }
  return (
    <div className="text-neutral-500 hover:text-neutral-50">
      <button onClick={toggle} className="p-2 flex flex-row">
        <div className="pt-1 ">
        <MdPeople size={'1.3em'}/>
        </div>
        <h1 className=" font-medium text-lg pl-2">Rosters</h1> 
        <div className="pt-1">
          {showMe?<MdKeyboardArrowRight size={'1.3em'}/>:<MdKeyboardArrowDown size={'1.3em'}/>}
        </div>
      </button>
      <div style={{
          display: showMe?"block":"none"
        }}>
        <div className="flex flex-col font-regular text-xs pl-10 bg-blue-100 text-neutral-900">
        <Link href="./" className="my-1 hover:font-bold focus:font-bold">Players</Link>
        <Link href="./" className="my-1 hover:font-bold focus:font-bold">Teams</Link>
        </div>
      </div>
    </div>
  )
}
export default RostersDropDown