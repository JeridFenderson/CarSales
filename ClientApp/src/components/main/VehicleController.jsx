import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../auth'
import '../../css/createVehicle.scss'
import { SelectVehicles } from './SelectVehicles'

export function VehicleController({ filterText }) {
  const history = useHistory()
  const { id, action } = useParams()
  const user = getUser()
  const [trigger, setTrigger] = useState(false)
  const path = history.location.pathname.split('/')[2]

  const [vehicles, setVehicles] = useState([
    {
      id: 0,
      year: 1885,
      make: 'Benz',
      model: 'Patent Motor Car',
      price: 825,
      odometer: 0,
      vin: '',
      fuelType: 'gas',
      driveTrain: 'direct',
      bodyType: 'wagon',
      exteriorColor: 'black',
      interiorColor: 'black',
      engineSize: 1,
      description: 'The first car on the road!',
      isSold: false,
    },
  ])

  const [vehicle, setVehicle] = useState({
    year: '',
    make: '',
    model: '',
    price: '',
    odometer: '',
    vin: '',
    fuelType: 'Gas',
    drivetrain: 'Manual',
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
      if (id) {
        setVehicle(json)
      }
    }
    if (path !== 'create' || (path === 'create' && id && action === 'edit')) {
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
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(vehicle),
      })
      console.log(response)
      history.push('/vehicles')
    }
    if (trigger || action === 'delete') submitForm()
  }, [trigger, action, history, id, vehicle])

  function handleStringFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.value })
  }

  function handleNumberFieldChange(event) {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      setVehicle({ ...vehicle, [event.target.name]: 0 })
    } else {
      setVehicle({ ...vehicle, [event.target.name]: value })
    }
  }

  function handleBooleanFieldChange(event) {
    console.log('hello')
    setVehicle({ ...vehicle, [event.target.name]: event.target.checked })
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    setTrigger(true)
  }

  if (path !== 'create') {
    return <SelectVehicles vehicles={vehicles} />
  } else {
    return (
      <main className="create">
        {isLoggedIn() && user.isAdmin && action === 'edit' && (
          <p className="back-arrow">
            <Link to={`/vehicles/${id}`}>
              <i className="fas fa-backward"></i>
            </Link>
          </p>
        )}
        <form onSubmit={handleFormSubmit}>
          <section>
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
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
            <p className="form-input">
              <label htmlFor="exteriorColor">Exterior Color</label>
              <input
                type="text"
                name="exteriorColor"
                placeholder="Grey"
                value={exteriorColor}
                onChange={handleStringFieldChange}
              />
            </p>
            <p className="form-input">
              <label htmlFor="interiorColor">Interior Color</label>
              <input
                type="text"
                name="interiorColor"
                placeholder="Black"
                value={interiorColor}
                onChange={handleStringFieldChange}
              />
            </p>
            <p className="form-input">
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
          <p className="form-input">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={handleStringFieldChange}
              rows="4"
            />
          </p>
          <section>
            {isLoggedIn() && user.isAdmin && (
              <p className="form-input">
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
