import Link from 'next/link'
import React from 'react'

const SportsDropDown = () => {
  return (
    <div>
      <h1 class="flex flex-row  px-5">
        <p>Sports</p> 
      </h1>
      <div class="flex flex-col font-regular text-xs pl-10 bg-blue-100 text-neutral-900">
        <Link href="./" class="my-1">Soccer</Link>
        <Link href="./" class="my-1">Volleyball</Link>
        <Link href="./" class="my-1">Multi-Sport</Link>
        <Link href="./" class="my-1">Pick-up Sport</Link>
      </div>
    </div>
  )
}

export default SportsDropDown
