import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn, logout } from '../../../auth'

export function Nav() {
  const [open, setOpen] = useState(false)
  const currentUser = getUser()

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
          {isLoggedIn() && <li>Welcome, {currentUser.firstName}!</li>}
          {(isLoggedIn() && currentUser.tier >= 1) ||
            (isLoggedIn() && (
              <li>
                <Link to="/vehicles/create" onClick={() => setOpen(false)}>
                  In search of a specific vehicle?
                  <br />
                  Want to sell your vehicle?
                </Link>
              </li>
            )) || (
              <li>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  In search of a specific vehicle?
                  <br />
                  Want to sell your vehicle?
                </Link>
              </li>
            )}
          <li>
            <Link to="/vehicles/view" onClick={() => setOpen(false)}>
              Pre-owned Inventory
            </Link>
          </li>
          {isLoggedIn() && currentUser.tier >= 1 && (
            <li>
              <Link to="/vehicles/create" onClick={() => setOpen(false)}>
                Add A Vehicle
              </Link>
            </li>
          )}
          <li>
            <Link to="/about" onClick={() => setOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </li>
          {(!isLoggedIn() && (
            <li>
              <Link to="/login" onClick={() => setOpen(false)}>
                Log In
              </Link>
            </li>
          )) || (
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

//           {isLoggedIn() && currentUser.isOwner && (
//             <li>
//               <Link to="/signup">Add A New User</Link>
//             </li>
//           )}
//           {isLoggedIn() && currentUser.isOwner && (
//             <li>
//               <Link to="/login">Delete A User</Link>
//             </li>
//           )}
