/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import Datepicker from "tailwind-datepicker-react"
import { IconChevronLeft, IconChevronRight, IconCalendarDue } from '@tabler/icons-react';
import DatePicker from 'tailwind-datepicker-react';

const options = {
	title: "Date of Birth",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-white border-2 border-black",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		prev: () => <span><IconChevronLeft/></span>,
		next: () => <span><IconChevronRight/></span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date("2023-01-01"),
	language: "en",
}

export default function DobDatePicker({ state, setState }) {
	const [show, setShow] = useState(false)
	const handleChange = (selectedDate) => {
		setState(selectedDate)
		console.log(selectedDate)
	}
	const handleClose = () => {
		setShow(!show);
	}

	return (
		<div>
			<DatePicker classNames="w-96 sm:w-44 border-2 border-black rounded-md " options={options} onChange={handleChange} show={show} setShow={handleClose}/>
		</div>
	)
}
