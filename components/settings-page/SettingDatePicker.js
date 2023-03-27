/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import { TextInput } from 'flowbite-react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import DatePicker from 'tailwind-datepicker-react';

const options = {
	title: 'Date of Birth',
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date('2030-01-01'),
	minDate: new Date('1950-01-01'),
	theme: {
		background: 'bg-white border border-black z-50',
		todayBtn: '',
		clearBtn: '',
		icons: '',
		text: '',
		disabledText: '',
		input: '',
		inputIcon: '',
		selected: '',
	},
	icons: {
		prev: () => (
			<span>
				<IconChevronLeft />
			</span>
		),
		next: () => (
			<span>
				<IconChevronRight />
			</span>
		),
	},
	datepickerClassNames: 'top-12',
	defaultDate: new Date('2023-01-01'),
	language: 'en',
};

export default function SettingDatePicker({ state, setState }) {
	const [show, setShow] = useState(false);
	const handleChange = (selectedDate) => {
		setState(selectedDate);
	};
	const handleClose = () => {
		setShow(!show);
	};
	const CalendarIcon = () => (
		<svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18 6V3h-2v1h-2V3H6v1H4V3H2v3h16Zm0 2H2v10h16V8Zm-2-7h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2V0h2v1h8V0h2v1ZM7 12H5v-2h2v2Zm4 0H9v-2h2v2Zm4 0h-2v-2h2v2Zm-8 4H5v-2h2v2Zm4 0H9v-2h2v2Z"
				fill="#000"
				fillOpacity={0.8}
			/>
		</svg>
	);
	const displayDate = (date) => {
		let stringDate = date.replaceAll('-', '/');
		stringDate = new Date(stringDate).toDateString();
		return (stringDate.substring(stringDate.indexOf(' ') + 1));
	}
	return (
		<div className="relative mb-12">
			<div className="absolute z-10 w-full">
				<TextInput
					id="date"
					type="text"
					placeholder="Pick a date"
					required={true}
					className="h-[40px] xl:w--[300px] cursor-pointer ms"
					value={displayDate(state)}
					onClick={() => setShow(true)}
					readOnly
				/>
				<span className="absolute right-2 top-1/2 -translate-y-1/2">
					<CalendarIcon />
				</span>
			</div>
			<div className={show === true ? '' : 'hidden'}>
				<DatePicker
					classNames="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
					options={options}
					onChange={handleChange}
					show={show}
					setShow={handleClose}
				/>
			</div>
		</div>
	);
}
