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
    isCreate,
    match,
     customClass,
 }) => {

    function getIndex(arr, name) {
        return arr.findIndex(obj => obj.name === name);
    }
    
    useEffect(() => {
        if (listLocations) 
        {
            if (isCreate) {
                
                setState(JSON.stringify(listLocations[0]));
            } else {
                const timer = setTimeout(() => {
                    let parseLocation = JSON.parse(match.location);
                    // console.log(parseLocation);
                    if (JSON.stringify(parseLocation) === '{}') {
                        console.log('CALLED')
                        setState(JSON.stringify(listLocations[0]));
                    } else {
                        const index = getIndex(listLocations, parseLocation.name);
                        setState(JSON.stringify(listLocations[index]));
                    }
                }, 320);
                return () => clearTimeout(timer);
            }
        }
	}, [listLocations])

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
 