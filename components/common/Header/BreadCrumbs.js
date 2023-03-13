/**
 * Last updated: 2023-03-13
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Breadcrumb } from 'flowbite-react'
import React from 'react'

const BreadCrumbs = (props) => {
  return (
    <div className="p-1">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="#">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Sports
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default BreadCrumbs


        /**
        After we have proper navigation we can change it;
        <div>
          {props.map((crumb)=>{
            return(
              <Breadcrumb.Item href="#">
                {crumb}
              </Breadcrumb.Item>
            )
          })}
        </div>
        */