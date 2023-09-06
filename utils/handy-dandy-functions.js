/**
 * Last updated: 2023-04-07
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */
import React, { useState } from 'react';

export const convertLevelToFull = (level) => {
	let getLevel = '';
	switch (level) {
		case 'AAA':
			getLevel = 'AAA - Elite';
			break;
		case 'AA':
			getLevel = 'AA - Competitive';
			break;
		case 'A':
			getLevel = 'A - Recreational';
			break;
		case 'B':
			getLevel = 'B - Recreational';
			break;
		case 'C':
			getLevel = 'C - Recreational';
			break;
		case 'D':
			getLevel = 'D - Recreational';
			break;
	}

	return getLevel;
};

export const convertColorsDisplay = (color, setDisplayColor) => {
	let colorDisplayed = '';
	switch (color) {
		case 'Yellow':
			colorDisplayed = `bg-yellow-300`;
			break;
		case 'Red':
			colorDisplayed = `bg-red-500`;
			break;
		case 'Blue':
			colorDisplayed = `bg-blue-500`;
			break;
		case 'Green':
			colorDisplayed = `bg-green-500`;
			break;
		case 'White':
			colorDisplayed = `bg-white`;
			break;
		case 'Black':
			colorDisplayed = `bg-black`;
			break;
	}
	setDisplayColor(colorDisplayed);
	// return colorDisplayed;
};


// TOOL TIP STUFF

export const Tooltip = ({ text }) => {
	return <div className="tooltip">{text}</div>;
};

export function useTooltip() {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipX, setTooltipX] = useState(0);
	const [tooltipY, setTooltipY] = useState(0);
  
	const handleMouseEnterTooltip = (e, setTP) => {
	  // Calculate the position of the tooltip relative to the hovered item
	  const item = e.target;
	  const rect = item.getBoundingClientRect();
	  const x = rect.left + window.scrollX;
	  const y = rect.top + window.scrollY + rect.height;
	  // Set the tooltip position
	  setTooltipX(x);
	  setTooltipY(y);
	  // Show the tooltip
	  setTP(true);
	};
  
	const handleMouseLeaveTooltip = (setTP) => {
	  // Hide the tooltip
	  setTP(false);
	};
  
	return {
	  showTooltip,
	  tooltipX,
	  tooltipY,
	  handleMouseEnterTooltip,
	  handleMouseLeaveTooltip,
	};
  }