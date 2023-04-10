/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

 import React, { useEffect, useState } from 'react';

 const LocationsDropdown = ({
    listLocations,
     state,
     setState,
    //  placeholder,
     customClass,
 }) => {
    
    useEffect(() => {
        setState(JSON.stringify(listLocations[0]));
    }, [])

     return (
         <div className="relative">
             <select
                 value={state}
                 onChange={(e) => {
                    setState(e.target.value);
                 }}
                 className={
                     customClass
                         ? customClass
                         : 'w-3/4 rounded border border-brand-neutral-300 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                 }
                 placeholder={'Locations'}
             >
                 {listLocations.map((option, index) => (
                     <option key={index} value={JSON.stringify(option)}>
                         {option.name}
                     </option>
                 ))}
                 {/* <span className="absolute right-2 top-1/2 -translate-y-1/2n z-[1000]">
                     <CircleArrowDown />
                 </span> */}
             </select>
         </div>
     );
 };
 
 export default LocationsDropdown;
 