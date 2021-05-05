import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getUser, isLoggedIn, recordAuthentication } from '../../../auth'
import '../../../css/form.scss'
import { Input, BigInput } from '../formInputs'

export function Contact() {
  const history = useHistory()
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    question: '',
  })
  const { firstName, lastName, phoneNumber, email, question } = newContact
  const currentUser = getUser()

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      setNewContact({
        ...newContact,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
      })
    }
  }, [])

  function handleStringFieldChange(event) {
    setNewContact({ ...newContact, [event.target.name]: event.target.value })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()
    // const response = await fetch('api/Contact', {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify(newContact),
    // })
    // const apiResponse = await response.json()

    // if (apiResponse.status === 400) {
    //   // @ts-ignore
    //   setErrorMessage(Object.values(apiResponse.errors).join(' '))
    // } else if (apiResponse.status === 404) {
    //   // @ts-ignore
    //   setErrorMessage(Object.values(apiResponse.errors).join(' '))
    // } else {
    //   history.push('/')
    // }
  }
  return (
    <main className="main-form">
      <form onSubmit={handleFormSubmit}>
        <section>
          <h1>Form Doesn't Work Yet - Teaching myself how to use MailKit</h1>
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
          {Input(['email', 'Email', email, handleStringFieldChange, true])}
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
        </section>
        <section>
          <p>
            <label htmlFor="question">Question</label>
            <textarea
              name="question"
              rows={10}
              cols={20}
              value={question}
              onChange={handleStringFieldChange}
              placeholder="Ask away"
              required
            ></textarea>
          </p>
          <p>
            <span></span>
            <button type="submit" value="Submit" className="submit">
              Send!
            </button>
            <span></span>
          </p>
        </section>
      </form>
    </main>
  )
}
