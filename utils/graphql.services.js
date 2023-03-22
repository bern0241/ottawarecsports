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
import { Auth } from 'aws-amplify';

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

/**
 * Returns the current authenticated user
 * @returns {Object} the current authenticated user object.
 */
export const getCurrentUser = async () => {
	try {
		const user = await Auth.currentAuthenticatedUser();
		return user;
	} catch (err) {
		console.warn(err);
	}
};

// Reference https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/
/**
 * Update the user attributes in cognito
 * @param {Object} updatedData An object containing the fields that needs to be updated.
 * @returns {String} The result of the update operation as a string.
 */
export const changeUserAttributes = async (newAttributes) => {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const result = await Auth.updateUserAttributes(user, newAttributes);
		return result;
	} catch (err) {
		console.warn(err);
	}
};

// Reference https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/
/**
 * Update the user's password
 * @param {String} oldPassword An object containing the fields that needs to be updated.
 * @param {String} newPassword An object containing the fields that needs to be updated.
 * @returns {String} The result of the update operation as a string.
 */
export const changeUserPassword = async (oldPassword, newPassword) => {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const result = await Auth.changePassword(user, oldPassword, newPassword);
		return result;
	} catch (err) {
		console.warn(err);
	}
};
/**
 * Create a team object
 * @param {object} teamData An object containing the team data.
 * @returns {String} The result of the operation.
 */
export const createTeam = async (teamData) => {
	try {
		const resp = await API.graphql({
			query: mutations.createTeams,
			variables: {
				input: teamData,
			},
		});
		return resp;
	} catch (err) {
		console.warn(err);
	}
};
