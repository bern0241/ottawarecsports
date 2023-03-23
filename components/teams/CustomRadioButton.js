/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 */
import React from 'react';

const CustomRadioButton = ({ content, selected, setSelected }) => {
	const CheckMark = () => (
		<svg width={15} height={11} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.161 10.136 0 5.298l.81-.865 4.325 4.053L13.62 0l.838.838-9.298 9.299Z"
				fill="#fff"
			/>
		</svg>
	);
	return (
		<div
			className="flex flex-row items-center gap-1"
			onClick={() => setSelected(content)}
		>
			{selected === content ? (
				<div className="border bg-brand-blue-900 border-brand-blue-900 flex items-center justify-center w-5 h-5">
					<CheckMark />
				</div>
			) : (
				<div className="border border-brand-neutral-300 w-5 h-5"></div>
			)}
			<p>{content}</p>
		</div>
	);
};

export default CustomRadioButton;
