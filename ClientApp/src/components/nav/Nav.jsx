import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn, logout } from '../../auth'
import '../../css/nav.scss'

export function Nav() {
  const [open, setOpen] = useState(false)
  const user = getUser()

  function handleLogOut() {
    logout()
    window.location.assign('/')
  }

  return (
    <nav>
      <div id="menuToggle">
        <input type="checkbox" onChange={() => setOpen(!open)} />
        <span className="burger"></span>
        <span className="burger"></span>
        <span className="burger"></span>

        <ul id="menu">
          {isLoggedIn() || (
            <li>
              <Link to="/login" onClick={() => setOpen(false)}>
                Log In
              </Link>
              <span> Or </span>
              <Link to="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </li>
          )}
          {isLoggedIn() && <li>Welcome, {user.firstName}!</li>}
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              <i className="mobile fas fa-home-lg-alt"></i>
            </Link>
          </li>
          {(isLoggedIn() && user.isAdmin) || (
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Specific Car Request
              </Link>
              <Link to="/" onClick={() => setOpen(false)}>
                <i className="mobile fas fa-car"></i>
              </Link>
            </li>
          )}
          <li>
            <Link to="/vehicles" onClick={() => setOpen(false)}>
              Pre-owned Inventory
            </Link>
            <Link to="/vehicles" onClick={() => setOpen(false)}>
              <i className="mobile fas fa-cars"></i>
            </Link>
          </li>
          {isLoggedIn() &&
            ((user.isOwner && (
              <li>
                <Link to="/vehicles/create" onClick={() => setOpen(false)}>
                  Add A Car
                </Link>
                <Link to="/vehicles/create" onClick={() => setOpen(false)}>
                  <i className="mobile far fa-car"></i>
                </Link>
              </li>
            )) || (
              <li>
                <Link to="/vehicles/create" onClick={() => setOpen(false)}>
                  Sell My Car
                </Link>
                <Link to="/vehicles/create" onClick={() => setOpen(false)}>
                  <i className="mobile far fa-car"></i>
                </Link>
              </li>
            ))}
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
          {isLoggedIn() && user.isOwner && (
            <li>
              <Link to="/signup">Add A New User</Link>
            </li>
          )}
          {isLoggedIn() && user.isOwner && (
            <li>
              <Link to="/login">Delete A User</Link>
            </li>
          )}
          {isLoggedIn() && (
            <li>
              <Link to="/" onClick={handleLogOut}>
                Sign Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
