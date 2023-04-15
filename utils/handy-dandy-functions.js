/**
 * Last updated: 2023-04-07
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

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
