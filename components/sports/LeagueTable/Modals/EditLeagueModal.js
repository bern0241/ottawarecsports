/**
 * Last updated: 2023-03-23
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */


function EditLeagueModal({ league, setOpenModal, sport, listLeaguesFunc }) {

    return (
    <>
{/* // <!-- Main modal --> */}
<div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-[5rem] left-0 right-0 z-[220] p-4 w-[32rem] mx-auto">
    <div class="relative w-full h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-md font-semibold text-gray-900 dark:text-white">
                    Edit League <span className='italic font-medium ml-1'>{league.name}</span>
                </h3>
                <button onClick={() => setOpenModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="p-6 space-y-6">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">League Name *</label>
                    <input value={leagueName} onChange={(e) => setLeagueName(e.target.value)} type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label for="numberOfTeams" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"># of Teams *</label>
                    <input min={0} max={150} value={numberOfTeams} onChange={(e) => setNumberOfTeams(e.target.value)} type="number" id="numberOfTeams" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='relative cursor-pointer' onClick={() => setOpenCoordinatorDrop(!openCoordinatorDrop)}>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coordinator</label>
                    <input value='' disabled type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" />
                    <div className='absolute right-2 top-[2.8rem]'>
                        <ion-icon style={{fontSize: '25px'}} name="caret-down-circle-outline"></ion-icon>
                    </div>
                    <div className='flex absolute top-[2.3rem]'>
                        {myCoordinators && myCoordinators.map((coordinator) => (
                            <>
                                <CoordinatorChip coordinator={coordinator} myCoordinators={myCoordinators} setMyCoordinators={setMyCoordinators} />
                            </>
                        ))}
                    </div>
                </div>
                    {openCoordinatorDrop && (
                        <>
                        <CoordinatorDropdown openDropdown={openCoordinatorDrop} setOpenDropdown={setOpenCoordinatorDrop} myCoordinators={myCoordinators} setMyCoordinators={setMyCoordinators} listUsers={listUsers} />
                        <div onClick={(e) => setOpenCoordinatorDrop(false)} class='z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
                        </>
                    )}

                <div className='flex justify-end'>
                    <div>
                    <label for="level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <div class="relative">
                        <select value={status} onChange={(e) => setStatus(e.target.value)} class="block appearance-none w-full bg-gray-100 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="level">
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        </select>
                    </div>
                    </div>
                </div>

                <div>
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">League Description</label>
                    <textarea value={leagueDescription} onChange={(e) => setLeagueDescription(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                </div>

                {message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                
            </div>

            {/* <!-- Modal footer --> */}
            <div class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                <button onClick={(e) => saveLeague(e)} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Save</button>
            </div>
        </div>
    </div>
</div>
    <div onClick={(e) => setOpenModal(false)} class='z-[200] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
</>
    )
}