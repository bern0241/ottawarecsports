/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES: https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#update-user-attributes
// https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/

import React, { useContext, createContext, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

const UserContext = createContext();

function UserContextProvider(props) {
	const [user, setUser] = useState('');
	const [authRoles, setAuthRoles] = useState();

	useEffect(() => {
		checkUser();
		Hub.listen('auth', ({ playload }) => {
			checkUser();
		});
	}, []);

	const checkUser = async () => {
		try {
			const user = await Auth.currentAuthenticatedUser();
			setUser(user);
			getAuthRole(user);
		} catch (error) {
			setUser(null);
		}
	};

	const getAuthRole = async (user) => {
		try {
			const groups =
				user.signInUserSession.accessToken.payload['cognito:groups'];
			setAuthRoles(groups);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<UserContext.Provider
			value={[user, setUser, authRoles, setAuthRoles]}
			{...props}
		/>
	);
}

const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error('Issue with provider');
	return context;
};

export { UserContextProvider, useUser };
