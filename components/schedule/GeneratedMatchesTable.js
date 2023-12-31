/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Greg Coghill (cogh0020@algonquinlive.com)
 * Son Tran <tran0460@algonquinlive.com>
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import GeneratedMatchRow from './GeneratedMatchRow';

const GeneratedMatchesTable = ({
	matches,
	setMatchToEdit,
	setIsEditing,
	setIsDeletingGenerated,
	setSaveBatchGame,
	selectedDate,
	setSelectedDate,
	isCoordinator,
	setGeneratedGames,
	deleteMatchFromArray,
	generatedGames,
	setDeleteArrayIndex,
}) => {
	const [matchDates, setMatchDates] = useState([]);
	const [displayedMatches, setDisplayedMatches] = useState([]);

	const router = useRouter();
	const { id } = router.query;

	return (
		<>
			<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex justify-between py-[35px] px-[20px] border-b border-brand-neutral-300 items-center w-12/12">
					<h1 className="text-base font-medium">
						<p className="absolute translate-y-[-38px]">
							{/* <b>League</b> - {league?.name} <br />
							<b>Season</b> - {season?.name} <br />
							<b>Division</b> - {division?.name} <br /> */}
							{/* <span className='font-light italic'>Matches</span> */}
						</p>
					</h1>
					{displayedMatches.length === 0 ? (
						<div className="py-[17px]"></div>
					) : (
						<div>
							<p>DatePicker</p>
						</div>
					)}
				</div>
				<table className="table-auto w-">
					<thead className="w-full"></thead>
					<tbody>
						{matches.length > 0 ? (
							matches.map((match, index) => (
								<React.Fragment key={index}>
									<GeneratedMatchRow
										index={index}
										match={match}
										setMatchToEdit={setMatchToEdit}
										setIsEditing={setIsEditing}
										setIsDeletingGenerated={setIsDeletingGenerated}
										isCoordinator={isCoordinator}
										setSaveBatchGame={setSaveBatchGame}
										deleteMatchFromArray={deleteMatchFromArray}
										generatedGames={generatedGames}
										setDeleteArrayIndex={setDeleteArrayIndex}
									/>
								</React.Fragment>
							))
						) : (
							<tr>
								<td
									colSpan={6}
									className="pt-8 pb-4 text-center text-sm text-brand-neutral-800"
								>
									No matches available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default GeneratedMatchesTable;
