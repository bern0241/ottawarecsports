/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */


export default function CoordinatorChip({ coordinator, myCoordinators, setMyCoordinators}) {

    return (
        <div className='flex justify-between gap-5 items-center'>
        <button onClick={(e) => e.stopPropagation()} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm pl-3 pr-2 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{coordinator.name}
        <ion-icon onClick={(e) => removeChip(e)} style={{paddingLeft: '0.3rem', fontSize: '15px', transform: 'translateY(3px)' }} name="close-outline"></ion-icon>
        </button>
    </div>
    )
}
