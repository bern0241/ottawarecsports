/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// NOTE: This date picker component is EXCLUSIVELY used for creating new Users in Admin Portal!

import React, { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import {
	IconChevronLeft,
	IconChevronRight,
	IconCalendarDue,
} from '@tabler/icons-react';
import DatePicker from 'tailwind-datepicker-react';

export default function DobDatePicker({ state, setState }) {
	const [show, setShow] = useState(false);

	const handleChange = (selectedDate) => {
		setState(selectedDate.toISOString().split('T')[0]);
		// console.log(selectedDate.toISOString().split('T')[0]);
	};
	const handleClose = () => {
		setShow(!show);
	};

	const options = {
		title: 'Date of Birth',
		autoHide: true,
		todayBtn: false,
		clearBtn: true,
		maxDate: new Date('2030-01-01'),
		minDate: new Date('1950-01-01'),
		theme: {
			background: 'bg-white border border-black',
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
		defaultDate: new Date(state),
		// defaultDate: new Date('2023/01/01'),
		language: 'en',
	};

	return (
		<div className="">
			<DatePicker
				classNames=""
				options={options}
				onChange={handleChange}
				show={show}
				setShow={handleClose}
			/>
		</div>
	);
}
