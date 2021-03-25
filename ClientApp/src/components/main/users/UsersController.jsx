import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getUser, isLoggedIn, recordAuthentication } from '../../../auth'
import '../../../css/form.scss'
import { Input, BigInput, OptionsInput } from '../formInputs'

export function UsersController() {
  const history = useHistory()
  const currentUser = getUser()
  const [errorMessage, setErrorMessage] = useState()
  const [addresses, setAddresses] = useState([
    {
      id: 0,
      addr1: '',
      city: '',
      region: '',
      country: '',
      postal_Code: '',
    },
  ])

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    tier: 0,
    addressId: 1,
    Media: [{}],
  })
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    tier,
    addressId,
    media,
  } = newUser
  const signup = history.location.pathname === '/signup' ? true : false
  const deleteAccount = history.location.pathname === '/login' ? true : false

  useEffect(() => {
    async function loadAddresses() {
      const response = await fetch(`api/Addresses`)
      const json = await response.json()
      setAddresses(json)
    }
    loadAddresses()
  }, [])

  function handleStringFieldChange(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  function handleNumberFieldChange(event) {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()
    let url = signup ? '/api/Users' : '/api/Sessions'
    url =
      isLoggedIn() && currentUser.tier >= 3 && deleteAccount
        ? `/api/Users/${email}`
        : url
    const action =
      isLoggedIn() && currentUser.tier >= 3 && deleteAccount ? 'DELETE' : 'POST'

    const response = await fetch(`${url}`, {
      method: `${action}`,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      // @ts-ignore
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else if (apiResponse.status === 404) {
      // @ts-ignore
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      if ((isLoggedIn() && currentUser.tier >= 3 && deleteAccount) || signup) {
        history.push('/')
      } else {
        recordAuthentication(apiResponse)
        window.location.assign('/')
      }
    }
  }

  return (
    <main className="main-form">
      {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}
      <form onSubmit={handleFormSubmit}>
        <section>
          {Input(['email', 'Email', email, handleStringFieldChange, true])}
          {Input([
            'password',
            'Password',
            password,
            handleStringFieldChange,
            true,
          ])}
          {isLoggedIn() && currentUser.tier >= 3 && !deleteAccount && (
            <h3>Create Another User, {currentUser.firstName}?</h3>
          )}
          {isLoggedIn() && currentUser.tier >= 3 && deleteAccount && (
            <>
              <h3>Delete A User, {currentUser.firstName}?</h3>
              <p>
                What's the email address of the account you'd like to delete?
              </p>
            </>
          )}
          {signup &&
            BigInput([
              'text',
              'First Name',
              firstName,
              handleStringFieldChange,
              true,
              '',
              'firstName',
            ])}
          {signup &&
            BigInput([
              'text',
              'Last Name',
              lastName,
              handleStringFieldChange,
              true,
              '',
              'lastName',
            ])}
          {signup && (
            <>
              <p>
                <label htmlFor="phoneNumber">Phone</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="xxx-xxx-xxxx"
                  value={phoneNumber}
                  onChange={handleStringFieldChange}
                  required
                />
              </p>
              <p className="addressSelector">
                <label htmlFor="addressId">Main Location</label>
                <select
                  name="addressId"
                  value={addressId}
                  onChange={handleNumberFieldChange}
                >
                  {addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.addr1}, {address.city}, {address.region}{' '}
                      {address.postal_Code}
                    </option>
                  ))}
                </select>
              </p>
            </>
          )}
        </section>
        <section>
          {isLoggedIn() &&
            currentUser.tier >= 2 &&
            !deleteAccount &&
            OptionsInput([
              '',
              'Tier',
              tier,
              handleNumberFieldChange,
              false,
              '',
              'tier',
              [
                { name: '', value: '' },
                { name: 'Admin', value: 1 },
                currentUser.tier >= 3 && { name: 'Site Manager', value: 2 },
                currentUser.tier >= 4 && { name: 'Owner', value: 3 },
              ],
            ])}
          <p>
            <span></span>
            <button type="submit" value="Submit" className="submit">
              Done!
            </button>
            <span></span>
            {isLoggedIn() ||
              (signup && <Link to="/login">Meant to Log In?</Link>) || (
                <Link to="/signup">Meant to Sign Up?</Link>
              )}
          </p>
        </section>
      </form>
    </main>
  )
}
