/**
 * Last updated: 2023-03-10
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react'

export default function PasswordField({ state, setState, showPassword, setShowPassword }) {
  return (
    <div className='relative'>
        <div class="relative z-0 my-6">
        <input value={state} onChange={(e) => setState(e.target.value)} type={showPassword ? 'text' : 'password'} name="password" id="password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 ${false ? 'focus:border-red-600 dark:focus:border-red-500 border-red-600' : 'focus:border-blue-600 dark:focus:border-blue-500 border-gray-300'} peer`} placeholder=" " required />
        <label for="password" className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${false ? 'peer-focus:dark:text-red-500 peer-focus:text-red-600 text-red-500 dark:text-red-400' : 'peer-focus:dark:text-blue-500 peer-focus:text-blue-600 text-gray-500 dark:text-gray-400'}`}>Password *</label>
        </div>
        <div className={`absolute right-2 ${false ? 'bottom-[1px]' : 'bottom-[1px]'}`}>
            <button onClick={() => setShowPassword(!showPassword)} className='ml-3'>
            <ion-icon style={{fontSize: '28px'}} className='items-center' name={showPassword ? 'eye-off-outline' : 'eye-outline' }></ion-icon>
            </button>
        </div>
    </div>
  )
}