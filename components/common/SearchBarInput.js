import React from 'react';
import { IconSearch } from '@tabler/icons-react';

export default function SearchBarInput({ id, placeholder, searchFunction }) {
	return (
		<form className="flex items-center">
			<label htmlFor={id} className="sr-only">
				Search
			</label>
			<div className="relative w-72 flex justify-between">
				<input
					type="search"
					id={id}
					name={id}
					className="w-full pr-10 rounded-3xl border-brand-blue-800 focus:border-brand-blue-800 focus:ring-brand-blue-800"
					placeholder={placeholder}
				/>
				<button
					onClick={(text) => {
						searchFunction(text);
					}}
					type="submit"
					className="absolute top-[50%] translate-y-[-50%] right-2 p-1 text-brand-neutral-800"
				>
					<IconSearch />
					<span className="sr-only">Search</span>
				</button>
			</div>
		</form>
	);
}
