/**
 * Last updated: 2023-03-11
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react'
import { useUser } from '@/context/userContext';

export default function Login() {
  const [uiState, setUiState] = useState(null);
  const [email, setEmail] = useState('');
  const [authRoles, setAuthRoles] = useUser();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => console.log(authRoles)}>Click me test Auth Roles</button>
    </div>
  )
}
