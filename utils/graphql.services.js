/**
 * Last updated: 2023-03-13
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 */

import { API, Auth } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { DivisionsEnum } from '@/models';

/**
 * Returns all teams in the database as an array
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
