/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 */

import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';

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
	} catch (e) {
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
		console.log(resp.data.listUsers.items);
		return resp.data.listUsers.items;
	} catch (e) {
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
	} catch (e) {
		console.warn(err);
	}
};
