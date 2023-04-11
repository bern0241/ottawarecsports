/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import {
	IconChevronLeft,
	IconChevronRight,
	IconCalendarDue,
} from '@tabler/icons-react';
import DatePicker from 'tailwind-datepicker-react';
import { Label } from 'flowbite-react';

const options = {
	title: 'Date of Birth',
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date('2050-01-01'),
	minDate: new Date('1950-01-01'),
	theme: {
		background: 'bg-white border border-black z-[1000] fixed top-[10rem] left-[50%] translate-x-[-50%]',
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
	defaultDate: new Date(),
	language: 'en',
};

export default function DobDatePicker({ state, setState }) {
	const [show, setShow] = useState(false);

	const handleChange = (selectedDate) => {
		setState(selectedDate.toISOString().split('T')[0]);
	};
	const handleClose = () => {
		setShow(!show);
	};

	return (
		<>
			<Label htmlFor="date" value="Date" className="sr-only" />
			<DatePicker
				id="date"
				classNames="w-full"
				options={options}
				onChange={handleChange}
				show={show}
				setShow={handleClose}
			/>
		</>
	);
}
