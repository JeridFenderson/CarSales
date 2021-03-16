import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { authHeader, getUser, isLoggedIn } from '../../../auth'
import '../../../css/createVehicle.scss'
import { SelectVehicles } from './SelectVehicles'

export function VehiclesController({ filterText }) {
  const history = useHistory()
  const { path, id, action } = useParams()
  const currentUser = getUser()
  const [trigger, setTrigger] = useState(false)

  const [vehicles, setVehicles] = useState([{ [id]: 0 }])

  const [vehicle, setVehicle] = useState({
    year: '',
    make: '',
    model: '',
    price: '',
    odometer: '',
    vin: '',
    fuelType: 'Gas',
    drivetrain: 'Automatic',
    bodyType: 'Sedan',
    exteriorColor: '',
    interiorColor: '',
    engineSize: '',
    description: '',
    isSold: false,
  })

  const {
    year,
    make,
    model,
    price,
    odometer,
    vin,
    fuelType,
    drivetrain,
    bodyType,
    exteriorColor,
    interiorColor,
    engineSize,
    description,
    isSold,
  } = vehicle

  useEffect(() => {
    async function loadVehicles() {
      let url = !filterText
        ? `/api/Vehicles`
        : `/api/Vehicles/?filterMake=${filterText}`
      if (id) url = `/api/Vehicles/${id}`
      const response = await fetch(url)
      const json = await response.json()
      setVehicles(json)
      if (path === 'create' && id) {
        setVehicle(json)
      }
    }
    if (
      path === 'view' ||
      (path === 'create' && id !== '' && action === 'edit')
    ) {
      loadVehicles()
    }
  }, [id, action, filterText, path])

  useEffect(() => {
    async function submitForm() {
      let url = '/api/Vehicles'
      let apiAction = 'POST'
      if (id) {
        switch (action) {
          case 'edit':
            url = `/api/Vehicles/${id}`
            apiAction = 'PUT'
            break
          case 'delete':
            url = `/api/Vehicles/${id}`
            apiAction = 'DELETE'
            break
          default:
            break
        }
      }
      const response = await fetch(`${url}`, {
        method: `${apiAction}`,
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(vehicle),
      })

      console.log(response)
      history.push('/vehicles')
    }
    if (trigger || action === 'delete' || (path === 'create' && id === ''))
      submitForm()
  }, [trigger, action, history, id, vehicle, path])

  function handleStringFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.value })
  }

  function handleNumberFieldChange(event) {
    setVehicle({
      ...vehicle,
      [event.target.name]: Number(event.target.value) || 0,
    })
  }

  function handleBooleanFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.checked })
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    setTrigger(true)
  }

  if (path === 'view') {
    return <SelectVehicles vehicles={vehicles} />
  } else {
    return (
      <main className="create">
        {id && (
          <p className="back-arrow">
            {console.log(id)}
            <Link to={`/vehicles/view/${id}`}>
              <i className="fas fa-backward"></i>
            </Link>
          </p>
        )}
        <form onSubmit={handleFormSubmit}>
          <section>
            <p>
              <label htmlFor="year">Year</label>
              <input
                type="text"
                name="year"
                placeholder="1973"
                value={year}
                onChange={handleNumberFieldChange}
                maxLength="4"
                required
              />
            </p>
            <p>
              <label htmlFor="make">Make</label>
              <input
                type="text"
                name="make"
                placeholder="Chevrolet"
                value={make}
                onChange={handleStringFieldChange}
                required
              />
            </p>
            <p>
              <label htmlFor="model">Model</label>
              <input
                type="text"
                name="model"
                placeholder="C10"
                value={model}
                onChange={handleStringFieldChange}
                required
              />
            </p>
            <p>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                placeholder="4000"
                value={price}
                onChange={handleNumberFieldChange}
                required
              />
            </p>
            <p>
              <label htmlFor="odometer">Odometer</label>
              <input
                type="text"
                name="odometer"
                placeholder="99999"
                value={odometer}
                onChange={handleNumberFieldChange}
                required
              />
            </p>
            <p>
              <label htmlFor="vin">VIN</label>
              <input
                type="text"
                name="vin"
                placeholder="CCY143S119259"
                value={vin}
                onChange={handleStringFieldChange}
              />
            </p>
          </section>
          <section>
            <p>
              <label htmlFor="fuelType">Fuel Type</label>
              <select
                name="fuelType"
                value={fuelType}
                onChange={handleStringFieldChange}
              >
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Hydrogen Fuel Cell">Hydrogen</option>
              </select>
            </p>
            <p>
              <label htmlFor="drivetrain">Drivetrain</label>
              <select
                name="drivetrain"
                value={drivetrain}
                onChange={handleStringFieldChange}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="DCT">DCT</option>
                <option value="Direct Drive">Direct Drive</option>
                <option value="Some Rare Drivetrain System">Other</option>
              </select>
            </p>
            <p>
              <label htmlFor="bodyType">Body Type</label>
              <select
                name="bodyType"
                value={bodyType}
                onChange={handleStringFieldChange}
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Pickup Truck">Pickup Truck</option>
                <option value="Minivan">Minivan</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Station Wagon">Station Wagon</option>
                <option value="Some Exotic Body Type">Other</option>
              </select>
            </p>
            <p>
              <label htmlFor="exteriorColor">Exterior Color</label>
              <input
                type="text"
                name="exteriorColor"
                placeholder="Grey"
                value={exteriorColor}
                onChange={handleStringFieldChange}
              />
            </p>
            <p>
              <label htmlFor="interiorColor">Interior Color</label>
              <input
                type="text"
                name="interiorColor"
                placeholder="Black"
                value={interiorColor}
                onChange={handleStringFieldChange}
              />
            </p>
            <p>
              <label htmlFor="engineSize">Engine Size</label>
              <input
                type="text"
                name="engineSize"
                placeholder="6.2"
                value={engineSize}
                onChange={handleStringFieldChange}
              />
            </p>
          </section>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={handleStringFieldChange}
              rows="4"
            />
          </p>
          <section>
            {isLoggedIn() && currentUser.isAdmin && (
              <p>
                <span></span>
                <label htmlFor="isSold">Sold?</label>
                <input
                  type="checkbox"
                  name="isSold"
                  checked={isSold}
                  onChange={handleBooleanFieldChange}
                />
                <span></span>
              </p>
            )}
            <p>
              <span></span>
              <input type="submit" value="Submit" className="submit" />
              <span></span>
            </p>
          </section>
        </form>
      </main>
    )
  }
}
