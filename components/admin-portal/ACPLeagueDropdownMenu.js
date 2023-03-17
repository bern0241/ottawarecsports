import React, { useEffect, useState } from 'react';

export default function ACPLeagueDropdownMenu({
	defaultLeague,
	changeUserLeague,
}) {
	const [value, setValue] = useState(defaultLeague);

	useEffect(() => {
		changeUserLeague(value);
	}, [value]);

	return (
		<select
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			className="w-3/4 rounded-3xl border border-brand-neutral-300"
		>
			<option value="" disabled>
				Select a league
			</option>
			<option value="League A">League A</option>
			<option value="League B">League B</option>
			<option value="League C">League C</option>
		</select>
	);
}
