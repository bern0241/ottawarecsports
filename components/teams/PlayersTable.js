/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 */

import { useState } from 'react';

const PlayersTable = ({ data, selectPlayer = () => {}, setTeamRoster }) => {
	const [input, setInput] = useState('');
	const [roster, setRoster] = useState(data);
	const MagnifyingGlassIcon = () => (
		<svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="m25.722 23.958-4.223-4.21a9.837 9.837 0 0 0 2.1-6.086 9.936 9.936 0 1 0-9.937 9.936 9.837 9.837 0 0 0 6.086-2.099l4.21 4.223a1.242 1.242 0 0 0 1.764 0 1.243 1.243 0 0 0 0-1.764ZM6.21 13.662a7.452 7.452 0 1 1 14.904 0 7.452 7.452 0 0 1-14.904 0Z"
				fill="#000"
				fillOpacity={0.6}
			/>
		</svg>
	);
	const DeleteIcon = () => (
		<svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M13.795 12.805a.701.701 0 1 1-.99.99L7 7.99l-5.805 5.805a.7.7 0 0 1-.99-.99L6.01 7 .205 1.195a.7.7 0 0 1 .99-.99L7 6.01 12.805.205a.7.7 0 0 1 .99.99L7.99 7l5.805 5.805Z"
				fill="#626262"
			/>
		</svg>
	);
	const removePlayerFromRoster = (id) => {
		const indexOfPlayer = roster.findIndex((e) => e.id === id);
		roster.splice(indexOfPlayer, 1);
		setRoster([...roster]);
		setTeamRoster(roster);
	};
	return (
		<div className=" w-full border rounded">
			<table className="table-auto w-full ">
				<thead className="bg-brand-neutral-100">
					<tr className="text-left">
						<div className="w-full relative">
							<input
								type="text"
								className="form-control bg-brand-neutral-100 border-none w-full text-center outline-brand-neutral-100"
								placeholder="Search"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										selectPlayer(input);
										setInput('');
									}
								}}
							/>
							<span className="absolute right-2 top-1/2 -translate-y-1/2">
								<MagnifyingGlassIcon />
							</span>
						</div>
					</tr>
				</thead>
				<tbody>
					{roster.map((item, index) => (
						<tr
							className={
								// Make every odd row dark
								index % 2 === 0 ? `` : `bg-brand-neutral-100`
							}
						>
							<div className={'relative'}>
								<p className="px-5 py-2">{item.user}</p>
								<span
									className="absolute right-4 top-1/2 -translate-y-1/2"
									onClick={() => {
										removePlayerFromRoster(item.id);
									}}
								>
									<DeleteIcon />
								</span>
							</div>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PlayersTable;
