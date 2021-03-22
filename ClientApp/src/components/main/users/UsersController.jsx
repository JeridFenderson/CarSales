import React, { useState } from 'react'
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
      dealer_id: 0,
      address: {},
    },
  ])
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: '',
    Media: [{}],
  })
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    role,
    media,
  } = newUser
  const signup = history.location.pathname === '/signup' ? true : false
  const deleteAccount = history.location.pathname === '/login' ? true : false

  function handleStringFieldChange(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  async function loadDealers() {
    const response = await fetch(`api/Dealers`)
    const json = await response.json()
    setDealers(json)
    console.log(json)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()
    console.log(newUser)
    let url = signup ? '/api/Users' : '/api/Sessions'
    url =
      isLoggedIn() && currentUser.role === 'OWNER' && deleteAccount
        ? `/api/Users/${email}`
        : url
    const action =
      isLoggedIn() && currentUser.role === 'OWNER' && deleteAccount
        ? 'DELETE'
        : 'POST'

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
      if (isLoggedIn() && currentUser.role === 'OWNER' && deleteAccount) {
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
      {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}
      <form onSubmit={handleFormSubmit}>
        <section>
          {isLoggedIn() && currentUser.role === 'OWNER' && !deleteAccount && (
            <h3>Create Another User, {currentUser.firstName}?</h3>
          )}
          {isLoggedIn() && currentUser.role === 'OWNER' && deleteAccount && (
            <>
              <h3>Delete A User, {currentUser.firstName}?</h3>
              <p>
                What's the email address of the account you'd like to delete?
              </p>
            </>
          )}
          {signup && loadDealers() && (
            <>
              {BigInput([
                'text',
                'First Name',
                firstName,
                handleStringFieldChange,
                true,
                '',
                'firstName',
              ])}
              {BigInput([
                'text',
                'Last Name',
                lastName,
                handleStringFieldChange,
                true,
                '',
                'lastName',
              ])}
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
            </>
          )}
        </section>
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
            (isLoggedIn() && currentUser.role === 'OWNER' && !deleteAccount)) &&
            Input([
              'password',
              'Password',
              password,
              handleStringFieldChange,
              true,
            ])}
        </section>
        <section>
          {isLoggedIn() &&
            currentUser.role === 'OWNER' &&
            !deleteAccount &&
            OptionsInput([
              '',
              'Role',
              role,
              handleStringFieldChange,
              false,
              '',
              'role',
              [
                { name: '', value: '' },
                { name: 'Admin', value: 'ADMIN' },
                { name: 'Site Manager', value: 'MANAGER' },
                { name: 'Owner', value: 'OWNER' },
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
