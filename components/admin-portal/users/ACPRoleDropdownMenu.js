/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';

export default function ACPRoleDropdownMenu({ defaultRole, changeUserRole }) {
	const [value, setValue] = useState(defaultRole);

	useEffect(() => {
		changeUserRole(value);
	}, [value]);

	return (
		<select
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			className="w-3/4 rounded-3xl border border-brand-neutral-300"
		>
			<option value="Administrator">Administrator</option>
			<option value="User">User</option>
		</select>
	);
}
