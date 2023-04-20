import React, { useState } from 'react';

export default function ChoosePlayerRole({
	clickStopPropagationFunc,
	setChangeRoleModal,
	setNewRole,
	currentRole,
}) {
	const [open, setOpen] = useState(false);

	function changeRoleFunc(newRole) {
		if (newRole === currentRole) {
			setOpen(false);
			return;
		}
		setOpen(false);
		setChangeRoleModal(true);
		setNewRole(newRole);
	}

	return (
		<div>
			<button
				onClick={(e) => {
					clickStopPropagationFunc(e);
					e.stopPropagation();
					e.preventDefault();
					setOpen(!open);
				}}
				id="dropdownDefaultButton"
				data-dropdown-toggle="dropdown"
				className="border-gray-400 border-[1px] text-black bg-white hover:bg-gray-100 focus:ring-[2px] focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mx-3"
				type="button"
			>
				<p className="hidden sm:contents">{currentRole}</p>
				<p className="sm:hidden contents">{currentRole.slice(0, 1)}</p>
				<svg
					className="w-4 h-4 ml-2"
					aria-hidden="true"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</button>

			{open && (
				<div
					id="dropdown"
					className="z-[500] absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 border border-gray-400"
				>
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownDefaultButton"
					>
						<li>
							<button autoFocus
								onClick={(e) => {
									clickStopPropagationFunc(e);
									changeRoleFunc('Player');
								}}
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left dark:hover:text-white"
							>
								Player
							</button>
						</li>
						<li>
							<button
								onClick={(e) => {
									clickStopPropagationFunc(e);
									changeRoleFunc('Captain');
								}}
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left dark:hover:text-white"
							>
								Captain
							</button>
						</li>
					</ul>
				</div>
			)}
			{open && (
				<div
					onClick={(e) => {
						clickStopPropagationFunc(e);
						setOpen(false);
					}}
					className="z-[10] opacity-50 fixed top-0 left-0 w-[100%] h-[100%]"
				/>
			)}
		</div>
	);
}
