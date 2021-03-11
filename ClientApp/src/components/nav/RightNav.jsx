import React from 'react'
import { Ul } from '../../css/navCss'

export function RightNav({ open }) {
  return (
    <Ul open={open}>
      <li>
        <a href="#">Log In</a>
        <span> Or </span> <a href="#">Sign Up</a>
      </li>
      <li>
        Home <i className="fas fa-home-lg-alt"></i>
      </li>
      <li>
        Specific Car Request <i className="fas fa-car"></i>
      </li>
      <li>
        Pre-owned Inventory <i className="fas fa-cars"></i>
      </li>
      <li>
        Sell My Car <i className="far fa-car"></i>
      </li>
      <li>
        Contact Us <i className="fas fa-address-card"></i>
      </li>
      <li>
        About Us <i className="fas fa-id-card-alt"></i>
      </li>
    </Ul>
  )
}
