import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getUser, isLoggedIn, recordAuthentication } from '../../auth'
import '../../css/form.scss'

export function EnterUser() {
  const history = useHistory()
  const user = getUser()
  const [errorMessage, setErrorMessage] = useState()
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
    isOwner: false,
  })
  const { firstName, lastName, email, password, isAdmin, isOwner } = newUser
  const signup = history.location.pathname === '/signup' ? true : false

  function handleStringFieldChange(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  function handleBooleanFieldChange(event) {
    if (event.target.name === 'isOwner') {
      setNewUser({
        ...newUser,
        isOwner: event.target.checked,
        isAdmin: event.target.checked,
      })
    } else {
      setNewUser({ ...newUser, [event.target.name]: event.target.checked })
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault()
    const url = signup ? '/api/Users' : '/api/Sessions'
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const apiResponse = await response.json()
    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      if (signup) {
        history.push('/')
      } else {
        recordAuthentication(apiResponse)
        window.location.assign('/')
      }
    }
  }

  return (
    <main className="form">
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        {isLoggedIn() && user.isOwner && (
          <h3>Create Another User, {user.firstName}?</h3>
        )}
        {signup && (
          <section>
            <p className="form-input">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Jerid"
                value={firstName}
                onChange={handleStringFieldChange}
                required
              />
            </p>
            <p className="form-input">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Fenderson"
                value={lastName}
                onChange={handleStringFieldChange}
                required
              />
            </p>
          </section>
        )}
        <section>
          <p className="form-input">
            <label htmlFor="model">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jerid@cea.com"
              value={email}
              onChange={handleStringFieldChange}
              required
            />
          </p>
          <p className="form-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={handleStringFieldChange}
              required
            />
          </p>
        </section>
        {isLoggedIn() && user.isOwner && (
          <section>
            <p className="form-input">
              <label htmlFor="isOwner">Owner</label>
              <input
                type="checkbox"
                name="isOwner"
                checked={isOwner}
                onChange={handleBooleanFieldChange}
              />
            </p>
            <p className="form-input">
              <label htmlFor="isAdmin">Admin</label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={isAdmin}
                onChange={handleBooleanFieldChange}
              />
            </p>
          </section>
        )}
        <p>
          <span></span>
          <input type="submit" value="Submit" className="submit" />
          <span></span>
          {(isLoggedIn() && user.isOwner) ||
            (signup && <Link to="/login">Meant to Log In?</Link>) || (
              <Link to="/signup">Meant to Sign Up?</Link>
            )}
        </p>
      </form>
    </main>
  )
}
