 /**
 * Last updated: 2023-03-11
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

 import React, { useContext, createContext, useState, useEffect } from 'react';
 import { Auth, Hub } from 'aws-amplify';

 const UserContext = createContext();

 function UserContextProvider(props) {
    const [user, setUser] = useState('');
    const [authRoles, setAuthRoles] = useState('');

    useEffect(() => {
        checkUser();

        Hub.listen("auth", ({ playload }) => {
            checkUser();
        })
    }, [])
    
    const checkUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser(); 
            setUser(user);
            // console.log('Auth User', user);
            getAuthRole(user);
        } catch (error) {
            setUser(null);
        }
    }

    const getAuthRole = async (user) => {
        try {
            const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups.includes('User')) {
                await setAuthRoles(authRoles => [...authRoles,'User'] );
            }
            if (groups.includes('Captain')) {
                await setAuthRoles(authRoles => [...authRoles,'Captain'] );
            }
            if (groups.includes('Referee')) {
                await setAuthRoles(authRoles => [...authRoles,'Referee'] );
            }
            if (groups.includes('Coordinator')) {
                await setAuthRoles(authRoles => [...authRoles,'Coordinator'] );
            }
            if (groups.includes('Admin')) {
                await setAuthRoles(authRoles => [...authRoles,'Admin'] );
            }
            if (groups.includes('Owner')) {
                await setAuthRoles(authRoles => [...authRoles,'Owner'] );
            }
            console.log('Auth Roles', authRoles);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <UserContext.Provider value={[user, setUser, authRoles, setAuthRoles]} {...props} />
    )
 }

 const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Issue with provider");
    return context;
 }

 export { UserContextProvider, useUser };