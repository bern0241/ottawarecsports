/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES: https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/buttons/
// https://flowbite.com/docs/components/tables/
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s

import { listDivisions } from '@/src/graphql/queries';
import { API } from '@aws-amplify/api';
import React, { useState, useEffect } from 'react';
import CreateButton from '../../../common/CreateButton';
import DivisionCard from './DivisionCard';
import CreateDivisionModal from '../../../common/sports/Divisions/CreateDivisionModal';

export default function ACPDivisionTable({
	selectedDivision,
	setSelectedDivision,
	selectedSeason,
	selectedLeague,
}) {
	const [newDivisionModal, setNewDivisionModal] = useState(false);
	const [divisions, setDivisions] = useState([]);
	const [showTable, setShowTable] = useState(false);

	// When a season is clicked, list all the relating divisions.
	useEffect(() => {
		if (selectedSeason) {
			listDivisionsFunc();
		}
	}, [selectedSeason]);

	// Display all divisions of a parenting season
	const listDivisionsFunc = async () => {
		const variables = {
			filter: {
				season: {
					eq: selectedSeason.id,
				},
			},
		};
		const divisions = await API.graphql({
			query: listDivisions,
			variables: variables,
		});
		setDivisions(divisions.data.listDivisions.items);
		setSelectedDivision(divisions.data.listDivisions.items[0]);
	};

	// When a league or season is clicked, show the division's table.
	// If both league and season are null, hide division's table.
	useEffect(() => {
		if (selectedLeague) {
			if (selectedLeague.Seasons && selectedLeague.Seasons.items.length !== 0) {
				setShowTable(true);
			}
		}
		if (selectedSeason) {
			setShowTable(true);
		}
		if (selectedLeague === null || selectedSeason === null) {
			setDivisions([]);
			setShowTable(false);
			setSelectedDivision(null);
		}
	}, [selectedLeague, selectedSeason]);

	// If false, do not display anything of the division table.
	if (!showTable) {
		return;
	}

	return (
		<>
			<div className="relative overflow-x-auto mx-auto w-full my-[1.3rem]">
				<table className="w-full text-sm text-left border border-gray-400">
					<thead className="text-md text-black bg-white">
						<tr>
							<th
								scope="col"
								className="text-lg font-medium px-6 py-4 pb-[2.8rem] text-[1rem]"
							>
								{!selectedSeason && <p className="absolute">{`Division`}</p>}
								{selectedSeason && (
									<p className="absolute">
										Divisions for{' '}
										<span className="font-semibold underline">
											{selectedSeason.name}
										</span>
									</p>
								)}
							</th>
							<th scope="col" className="font-medium px-6 py-4"></th>
							<th scope="col" className="font-medium px-6 py-4"></th>
							<th scope="col" className="font-medium px-6 py-4 hidden sm:table-cell"></th>
							<th className="absolute right-5 top-2">
								<CreateButton
									label="Create New Division"
									state={newDivisionModal}
									setState={setNewDivisionModal}
									selectedType={selectedSeason}
								/>
							</th>
						</tr>
					</thead>
					<thead className="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="font-light px-6 py-2 border-l-[1px] border-gray-400"
							>
								Name
							</th>
							<th scope="col" className="text-center font-light px-6 py-2">
								Level
							</th>
							<th scope="col" className="text-center font-light px-6 py-2 hidden sm:table-cell">
								Team Count
							</th>
							<th
								scope="col"
								className="font-light py-2 border-r-[1px] text-right pr-10 border-gray-400"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{divisions &&
							divisions.map((division, index) => (
								<React.Fragment key={index}>
									<DivisionCard
										division={division}
										selectedDivision={selectedDivision}
										setSelectedDivision={setSelectedDivision}
										selectedSeason={selectedSeason}
										listDivisionsFunc={listDivisionsFunc}
									/>
								</React.Fragment>
							))}
						{divisions && selectedSeason !== null && divisions.length === 0 && (
							<tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
								<th
									scope="row"
									className="px-6 my-2 font-medium whitespace-nowrap dark:text-white flex items-center justify-center text-xs absolute left-0 right-0 mx-auto italic"
								>
									No divisions for this season.
								</th>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4"></td>
								<td className="flex gap-4 px-6 py-4 text-center"></td>
							</tr>
						)}

						<tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
							<th
								scope="row"
								className="px-6 py-6 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer"
							>
								{/* All Divisions
                            <ion-icon style={{fontSize: '20px', color: 'blue'}} name="chevron-forward-outline"></ion-icon> */}
							</th>
							<td className="px-6 py-4"></td>
							<td className="px-6 py-4 hidden sm:table-cell"></td>
							<td className="flex gap-4 px-6 py-4 text-center"></td>
						</tr>
					</tbody>
				</table>
			</div>
			{newDivisionModal && (
				<>
					<CreateDivisionModal
						openModal={newDivisionModal}
						setOpenModal={setNewDivisionModal}
						selectedSeason={selectedSeason}
						listDivisionsFunc={listDivisionsFunc}
						setSelectedDivision={setSelectedDivision}
					/>
				</>
			)}
		</>
	);
}
