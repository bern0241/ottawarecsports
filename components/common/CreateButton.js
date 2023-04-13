/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import { IconCirclePlus } from '@tabler/icons-react';

export default function CreateButton({ label, state, setState }) {
	return (
		<button
			onClick={() => setState(!state)}
			type="button"
			className="flex text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
		>
			<IconCirclePlus className="mt-[2px] mr-2 h-5 w-5" />
			{label}
		</button>
	);
}
