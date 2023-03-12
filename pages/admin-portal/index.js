/**
 * Last updated: 2023-03-12
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react'
import AdminIdentifier from '@/components/admin-portal/AdminIdentifier'
import SignOutButton from '@/components/common/SignOutButton'

export default function AdminPortal() {
  return (
    <div>
        <h1>Admin Portal</h1>
        <AdminIdentifier />
        <SignOutButton />
    </div>
  )
}