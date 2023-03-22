import React from 'react';

const MaxMembersStepper = ({ state = 0, setState }) => {
	const MinusSvg = () => (
		<button onClick={() => setState(state--)}>
			<svg
				className="bg-gray-50"
				width={19}
				height={18}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18.901 9A9 9 0 1 1 .902 9a9 9 0 0 1 18 0Zm-3.362.011a.9.9 0 0 0-.9-.9H5.15a.9.9 0 0 0 0 1.8h9.487a.9.9 0 0 0 .9-.9Z"
					fill="#000"
					fillOpacity={0.7}
				/>
			</svg>
		</button>
	);

	const PlusSvg = () => (
		<button onClick={() => setState(state--)}>
			<svg
				onClick={() => setState(state++)}
				className="bg-gray-50"
				width={19}
				height={18}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9.901 0a9 9 0 1 0 .002 18.001A9 9 0 0 0 9.9 0Zm4.091 9.818H10.72v3.273H9.084V9.818H5.81V8.182h3.273V4.909h1.636v3.273h3.273v1.636Z"
					fill="#000"
					fillOpacity={0.7}
				/>
			</svg>
		</button>
	);
	return (
		<div className="relative">
			<input
				value={state}
				onChange={(e) => setState(e.target.value)}
				type="number"
				class="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				min={0}
				max={20}
			/>
			<div className="absolute flex flex-row p-2 gap-2 right-0 top-1/2 -translate-y-1/2">
				<MinusSvg />
				<PlusSvg />
			</div>
		</div>
	);
};

export default MaxMembersStepper;
