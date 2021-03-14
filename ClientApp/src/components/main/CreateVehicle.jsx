import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/createVehicle.scss'

export function CreateVehicle() {
  const history = useHistory()

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
  } = vehicle

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

  async function handleFormSubmit(event) {
    event.preventDefault()
    await fetch('/api/Vehicles', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(vehicle),
    })
    history.push('/vehicles')
  }

  return (
    <main className="create">
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
        <p>
          <span></span>
          <input type="submit" value="Submit" className="submit" />
          <span></span>
        </p>
      </form>
    </main>
  )
}
