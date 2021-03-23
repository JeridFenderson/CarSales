import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getUser, isLoggedIn, recordAuthentication } from '../../../auth'
import '../../../css/form.scss'
import { Input, BigInput, OptionsInput } from '../formInputs'

export function UsersController() {
  const history = useHistory()
  const currentUser = getUser()
  const [errorMessage, setErrorMessage] = useState()
  const [dealers, setDealers] = useState([
    {
      id: '',
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
    dealerId: '',
    role: '',
    Media: [{}],
  })
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    dealerId,
    role,
    media,
  } = newUser
  const signup = history.location.pathname === '/signup' ? true : false
  const deleteAccount = history.location.pathname === '/login' ? true : false

  useEffect(() => {
    async function loadDealers() {
      const response = await fetch(`api/Dealers`)
      const json = await response.json()
      setDealers(json)
    }
    loadDealers()
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
    if (Number.isNaN(dealerId)) {
      setNewUser({ ...newUser, dealerId: dealers[0].id })
    }
    let url = signup ? '/api/Users' : '/api/Sessions'
    url =
      isLoggedIn() && currentUser.tier <= 3 && deleteAccount
        ? `/api/Users/${email}`
        : url
    const action =
      isLoggedIn() && currentUser.tier <= 3 && deleteAccount ? 'DELETE' : 'POST'

    const response = await fetch(url, {
      method: action,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    if (response.status === 400) {
      setErrorMessage(Object.values(response.errors).join(' '))
    } else if (response.status === 404) {
      setErrorMessage(Object.values(response.errors).join(' '))
    } else {
      if (isLoggedIn() && currentUser.tier <= 3 && deleteAccount) {
      } else if (signup) {
        history.push('/')
      } else {
        recordAuthentication(response)
        window.location.assign('/')
      }
    }
  }

  return (
    <main className="main-form">
      {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}
      <form onSubmit={handleFormSubmit}>
        <section></section>
        <section>
          {Input(['email', 'Email', email, handleStringFieldChange, true])}
          {/* {OptionsInput([
            '',
            'Main Site',
            dealerId,
            handleStringFieldChange,
            true,
            '',
            'dealerId',
            [
              dealers &&
                dealers.map((dealer) => ({
                  name: `${dealer.address.addr1} ${dealer.address.city} ${dealer.address.region}`,
                  value: dealer.id,
                })),
            ],
          ])} */}
          {(!isLoggedIn() ||
            (isLoggedIn() && currentUser.tier <= 3 && !deleteAccount)) &&
            Input([
              'password',
              'Password',
              password,
              handleStringFieldChange,
              true,
            ])}
          {isLoggedIn() && currentUser.tier <= 3 && !deleteAccount && (
            <h3>Create Another User, {currentUser.firstName}?</h3>
          )}
          {isLoggedIn() && currentUser.tier <= 3 && deleteAccount && (
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
              <p className="dealerSelector">
                <label htmlFor="dealerId">Main Location</label>
                <select
                  name="dealerId"
                  value={dealerId}
                  onChange={handleNumberFieldChange}
                >
                  {dealers.map((dealer) => (
                    <option key={dealer.id} value={dealer.id}>
                      {dealer.addr1}, {dealer.city}, {dealer.region}{' '}
                      {dealer.postal_Code}
                    </option>
                  ))}
                </select>
              </p>
            </>
          )}
        </section>
        <section>
          {isLoggedIn() &&
            currentUser.tier <= 2 &&
            !deleteAccount &&
            OptionsInput([
              '',
              'Role',
              role,
              handleStringFieldChange,
              false,
              '',
              'tier',
              [
                { name: '', value: '' },
                { name: 'Admin', value: 1 },
                currentUser.tier <= 3 && { name: 'Site Manager', value: 2 },
                currentUser.tier <= 4 && { name: 'Owner', value: 3 },
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
