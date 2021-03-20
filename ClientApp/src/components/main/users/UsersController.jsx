import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getUser, isLoggedIn, recordAuthentication } from '../../../auth'
import '../../../css/form.scss'

export function UsersController() {
  const history = useHistory()
  const currentUser = getUser()
  const [errorMessage, setErrorMessage] = useState()
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
    isOwner: false,
    Media: {},
  })
  const {
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    isOwner,
    media,
  } = newUser
  const signup = history.location.pathname === '/signup' ? true : false
  const deleteAccount = history.location.pathname === '/login' ? true : false

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
    let url = signup ? '/api/Users' : '/api/Sessions'
    url =
      isLoggedIn() && currentUser.isOwner && deleteAccount
        ? `/api/Users/${email}`
        : url
    const action =
      isLoggedIn() && currentUser.isOwner && deleteAccount ? 'DELETE' : 'POST'

    const response = await fetch(`${url}`, {
      method: `${action}`,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else if (apiResponse.status === 404) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      if (isLoggedIn() && currentUser.isOwner && deleteAccount) {
      } else if (signup) {
        history.push('/')
      } else {
        recordAuthentication(apiResponse)
        window.location.assign('/')
      }
    }
  }

  return (
    <main className="main-form">
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        {isLoggedIn() && currentUser.isOwner && !deleteAccount && (
          <h3>Create Another User, {currentUser.firstName}?</h3>
        )}
        {isLoggedIn() && currentUser.isOwner && deleteAccount && (
          <section>
            <h3>Delete A User, {currentUser.firstName}?</h3>
            <p>What's the email address of the account you'd like to delete?</p>
          </section>
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
          {(!isLoggedIn() ||
            (isLoggedIn() && currentUser.isOwner && !deleteAccount)) && (
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
          )}
        </section>
        {isLoggedIn() && currentUser.isOwner && !deleteAccount && (
          <section>
            <p className="form-input">
              <span></span>
              <label htmlFor="isOwner">Owner</label>
              <input
                type="checkbox"
                name="isOwner"
                checked={isOwner}
                onChange={handleBooleanFieldChange}
              />
              <span></span>
            </p>
            <p className="form-input">
              <span></span>
              <label htmlFor="isAdmin">Admin</label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={isAdmin}
                onChange={handleBooleanFieldChange}
              />
              <span></span>
            </p>
          </section>
        )}
        <p>
          <span></span>
          <input type="submit" value="Submit" className="submit" />
          <span></span>
          {isLoggedIn() ||
            (signup && <Link to="/login">Meant to Log In?</Link>) || (
              <Link to="/signup">Meant to Sign Up?</Link>
            )}
        </p>
      </form>
    </main>
  )
}
