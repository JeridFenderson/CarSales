import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/nav.scss'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav>
      <div id="menuToggle">
        <input type="checkbox" onChange={() => setOpen(!open)} />
        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Log In
            </Link>
            <strong> Or </strong>
            <Link to="/" onClick={() => setOpen(false)}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              <i className="mobile fas fa-home-lg-alt"></i>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Specific Car Request
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              <i className="mobile fas fa-car"></i>
            </Link>
          </li>
          <li>
            <Link to="/vehicles" onClick={() => setOpen(false)}>
              Pre-owned Inventory
            </Link>
            <Link to="/vehicles" onClick={() => setOpen(false)}>
              <i className="mobile fas fa-cars"></i>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Sell My Car
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              <i className="mobile far fa-car"></i>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              <i className="mobile fas fa-address-card"></i>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              About Us
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              <i className="mobile fas fa-id-card-alt"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
