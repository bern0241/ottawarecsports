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
            getLevel = 'AAA - Elite'
            break;
        case 'AA':
            getLevel = 'AA - Competitive'
            break;
        case 'A':
            getLevel = 'A - Recreational'
            break;
        case 'B':
            getLevel = 'B - Recreational'
            break;
        case 'C':
            getLevel = 'C - Recreational'
            break;
        case 'D':
            getLevel = 'D - Recreational'
            break;
    }

    return getLevel;
}