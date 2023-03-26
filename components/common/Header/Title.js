/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderTitle = () => {
	return (
		<div className="p-1 pt-0 pl-7">
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row'>
					<Link href="/" className="font-light text-[.8rem]">Home</Link>
						<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
					<Link href="/settings" className="font-light text-[.8rem]">Settings</Link>
				</div>
				<p className="font-semibold text-[1.8rem]">Settings</p>
			</div>
		</div>
	);
};

export default HeaderTitle;
