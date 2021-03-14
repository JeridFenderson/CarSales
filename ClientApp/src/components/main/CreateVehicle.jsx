import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/createVehicle.scss'

export function CreateVehicle() {
  const history = useHistory()

  const [vehicle, setVehicle] = useState({
    year: 0,
    make: '',
    model: '',
    price: 0,
    odometer: 0,
    vin: '',
    fuelType: '',
    drivetrain: '',
    bodyType: '',
    exteriorColor: '',
    interiorColor: '',
    engineSize: '',
    description: '',
  })

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
    history.push('/')
  }

  return (
    <main>
      <form onSubmit={handleFormSubmit}>
        <section>
          <p className="form-input">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              name="year"
              value={vehicle.year}
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
              value={vehicle.make}
              onChange={handleStringFieldChange}
              required
            />
          </p>
          <p className="form-input">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              value={vehicle.model}
              onChange={handleStringFieldChange}
              required
            />
          </p>
          <p className="form-input">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={vehicle.price}
              onChange={handleNumberFieldChange}
              required
            />
          </p>
          <p className="form-input">
            <label htmlFor="odometer">Odometer</label>
            <input
              type="text"
              name="odometer"
              value={vehicle.odometer}
              onChange={handleNumberFieldChange}
              required
            />
          </p>
        </section>
        <section>
          <p className="form-input">
            <label htmlFor="vin">Vin</label>
            <input
              type="text"
              name="vin"
              value={vehicle.vin}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="fuelType">Fuel Type</label>
            <input
              type="text"
              name="fuelType"
              value={vehicle.fuelType}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="drivetrain">Drivetrain</label>
            <input
              type="text"
              name="drivetrain"
              value={vehicle.drivetrain}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="bodyType">Body Type</label>
            <input
              type="text"
              name="bodyType"
              value={vehicle.bodyType}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="exteriorColor">Exterior Color</label>
            <input
              type="text"
              name="exteriorColor"
              value={vehicle.exteriorColor}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="interiorColor">Interior Color</label>
            <input
              type="text"
              name="interiorColor"
              value={vehicle.interiorColor}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="engineSize">Engine Size</label>
            <input
              type="text"
              name="engineSize"
              value={vehicle.engineSize}
              onChange={handleStringFieldChange}
            />
          </p>
        </section>
        <p className="form-input">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={vehicle.description}
            onChange={handleStringFieldChange}
          />
          <span className="note">
            Additional notes and features that you'd like to advertise.
          </span>
        </p>
        <input type="submit" value="Submit" />
      </form>
    </main>
  )
}
