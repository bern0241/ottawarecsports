import React from 'react';

const DivisionRow = () => {
	return (
		<tr
			key={team.id}
			className="border-b border-brand-neutral-300"
			onClick={navigateToProfile}
		>
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium">
				<div className="flex items-center">
					<img
						src={profileImage}
						className="rounded-full mr-5 w-[60px] h-[60px] object-cover"
					></img>
					{team.name}
				</div>
			</td>
			<td className="p-5">
				{currentSeason
					? currentSeason.captains.map((captain, index) => (
							<span key={index}>{userName}</span>
					  ))
					: 'John Doe'}
			</td>
			<td className="p-5">{team.sports || 'Soccer'}</td>
			<td className="p-5">
				{currentSeason ? currentSeason.roster.length : 0}/15
			</td>
			<td className="p-5">{team.notes ? team.notes : 'N/A'}</td>
			{/* <td className="p-5">
        <div className="flex">
            <IconEdit
                className="text-brand-blue-900 mr-3"
                onClick={() => setCurrentTeam(team)}
            />
            <IconTrash className="text-brand-orange-800 hover:bg-blue-400" />
        </div>
    </td> */}
		</tr>
	);
};

export default DivisionRow;
