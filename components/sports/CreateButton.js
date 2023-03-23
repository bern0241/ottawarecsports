/**
 * Last updated: 2023-03-23
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

export default function CreateButton() {
    
    return (
        <button onClick={() => setState(!state)} type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">⊕ {label}</button>
    )
}