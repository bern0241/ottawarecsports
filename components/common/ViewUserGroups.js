/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react'
import { useUser } from '@/context/userContext'

export default function ViewUserGroups() {
  const [user, setUser, authRoles, setAuthRoles] = useUser();
  return (
    <>
    {user && (
        <div className='border'>
          <p>User Groups of current user:</p>
          <ul className='list-disc'>
            {authRoles && authRoles.map((role) => (
              <>
              <li>
                {role}
              </li>
              </>
            ))}
            {authRoles.length === 0 && (
              <li>
                No user groups for this user.
              </li>
            )}
          </ul>
        </div>
    )}
  </>
  )
}