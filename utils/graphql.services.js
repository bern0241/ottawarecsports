/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

/**
 * Returns all players in the database
 * @returns {[Object]} Player objects in an array
 */
export const getAllPlayers = async () => {
	try {
		const resp = await API.graphql({
			query: queries.listPlayersSoccers,
		});
		return resp.data.listPlayersSoccers.items;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * Returns all users in the database
 * @returns {[Object]} User objects in an array
 */
export const getAllUsers = async () => {
	try {
		const resp = await API.graphql({
			query: queries.listUsers,
		});
		return resp.data.listUsers.items;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * Returns all teams in the database
 * @returns {[Object]} Team objects in an array
 */
export const getAllTeams = async () => {
	try {
		const resp = await API.graphql({
			query: queries.listTeams,
		});
		return resp.data.listTeams.items;
	} catch (err) {
		console.warn(err);
	}
};

/**
 * Sends an update request to the User table
 * @param {String} id The id of the user that needs to be updated
 * @param {Object} updatedData An object containing the fields that needs to be updated.
 */
export const updateUserInfo = async (id, updatedData) => {
	try {
		const resp = await API.graphql({
			query: mutations.updateUsers,
			variables: {
				input: {
					id,
					...updatedData,
					// userNotes: {},
					// PlayersSoccer: {
					// 	PlayerDivisionStats: [
					// 		{
					// 			id,
					// 			team: '123',
					// 			division: '123',
					// 			position: 'Goalie',
					// 			goals: 55,
					// 			assists: 12,
					// 			yellow_cards: 1,
					// 			red_cards: 1,
					// 			games_played: 12,
					// 		},
					// 	],
					// },
				},
			},
		});
		console.log(resp);
		return resp;
	} catch (err) {
		console.warn(err);
	}
};
