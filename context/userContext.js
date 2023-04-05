/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useContext, createContext, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import AWS from 'aws-sdk';

const UserContext = createContext();

function UserContextProvider(props) {
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	const [user, setUser] = useState('');
	const [authRoles, setAuthRoles] = useState();
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		checkUser();
		Hub.listen('auth', ({ playload }) => {
			checkUser();
		});

		fetchAllUsers();
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

	const fetchAllUsers = async () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
		};
		cognitoidentityserviceprovider.listUsers(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				setUserList(data.Users);
			}
		});
	};

	return (
		<UserContext.Provider
			value={[user, setUser, authRoles, setAuthRoles, userList]}
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
