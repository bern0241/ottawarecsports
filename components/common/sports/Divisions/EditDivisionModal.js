/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { API } from '@aws-amplify/api';
import { createDivision, updateDivision } from '@/src/graphql/mutations';

export default function EditDivisionModal({ division, setOpenModal, selectedSeason, listDivisionsFunc, setSelectedDivision }) {
  const [divisionName, setDivisionName] = useState(division.name);
  const [level, setLevel] = useState(division.level);
  const [numOfTeams, setNumOfTeams] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
      const timer = setTimeout(() => {
          setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
  }, [message]);

  const updateDivisionFunc = async (e) => {
      e.preventDefault();
      if (divisionName === '' || level === '') {
          setMessage({status: 'error', message: 'Please fillout required fields.'});
          return;
      }
      try {
          const data = {
              id: division.id,
              name: divisionName,
              level: level
          }
          const apiData = await API.graphql({
              query: updateDivision,
              variables: {input: data},
          })
          listDivisionsFunc();
          setOpenModal(false);
          setSelectedDivision(apiData.data.updateDivision)
          setMessage({status: 'success', message: 'Division successfully created.'});
      } catch (error) {
          setMessage({status: 'error', message: error.message});
          console.error(error);
      }    
  }
  
  return (
      <>
      {/* // <!-- Main modal --> */}
      <div id="defaultModal" tabindex="-1" aria-hidden="true" className="fixed top-[5rem] left-0 right-0 z-[220] p-4 w-[32rem] mx-auto">
          <div className="relative w-full h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                          Edit Division
                      </h3>
                      <button onClick={() => setOpenModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>

                  {/* <!-- Modal body --> */}
                  <div className="p-6 space-y-6">
                      <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Division Name *</label>
                          <input value={divisionName} onChange={(e) => setDivisionName(e.target.value)} type="text" id="name" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>

                      <div className="">
                      <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level *</label>
                      <div className="relative">
                          <select value={level} onChange={(e) => setLevel(e.target.value)} className="block appearance-none w-full bg-gray-100 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="level">
                          <option hidden>Choose Division</option>  
                          <option value="D">D - Recreational</option>
                          <option value="C">C - Recreational</option>
                          <option value="B">B - Recreational</option>
                          <option value="A">A - Recreational</option>
                          <option value="AA">AA - Competitive</option>
                          <option value="AAA">AAA - Elite</option>
                          </select>
                      </div>
                      </div>

                      {message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                      
                  </div>

                  {/* <!-- Modal footer --> */}
                  <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                      <button onClick={(e) => updateDivisionFunc(e)} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Save</button>
                  </div>
              </div>
          </div>
      </div>
          <div onClick={(e) => setOpenModal(false)} className='z-[200] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
      </>
  )
}