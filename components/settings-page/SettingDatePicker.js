/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
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
		console.log(selectedDate);
	};
	const handleClose = () => {
		setShow(!show);
	};

	return (
		<div>
			<DatePicker
				classNames="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
				options={options}
				onChange={handleChange}
				show={show}
				setShow={handleClose}
			/>
		</div>
	);
}
