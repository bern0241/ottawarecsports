/**
 * Last updated: 2023-03-26
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useEffect } from 'react';

export default function StatusMessage({ message, setMessage }) {
	// Removes the message after 5 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	return (
		<div>
			{message && (
				<p
					id="standard_error_help"
					className={`my-2 text-center text-sm ${
						message.status === 'success'
							? 'text-green-600 dark:text-green-400'
							: 'text-red-600 dark:text-red-400'
					}`}
				>
					<span className="font-medium">{message.message}</span>
				</p>
			)}
		</div>
	);
}
