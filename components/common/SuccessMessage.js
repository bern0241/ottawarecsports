/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useEffect } from 'react';

export default function SuccessMessage({ title, message, setDisplay }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			setDisplay(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className="z-[500] p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed bottom-0"
			role="alert"
		>
			<span className="font-medium">{title}</span> {message}
		</div>
	);
}
