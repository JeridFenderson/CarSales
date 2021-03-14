import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../../css/vehicleDetails.scss'

export function VehicleDetails() {
  const { id } = useParams()

  const [vehicle, setVehicle] = useState({
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

  useEffect(() => {
    const notFound = {
      make: `Sorry my friend, vehicle not found...`,
      description: `It looks like the vehicle you're searching for isn't in our current inventory`,
    }
    async function loadVehicle() {
      const response = await fetch(`/api/Vehicles/${id}`)
      const json = await response.json()
      if (json.status === 404) {
        setVehicle(notFound)
      } else {
        setVehicle(json)
      }
    }
    loadVehicle()
  }, [id])

  return (
    <main className="details">
      <p className="back-arrow">
        <Link to="/vehicles">
          <i className="fas fa-backward"></i>
        </Link>
      </p>
      <h2>
        {year} {make} {model}
      </h2>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt={`${year} ${make} ${model}`}
        />
      </figure>
      <ul>
        <li>
          Odometer miles: {odometer}. {vin && `VIN: ${vin}. `}
          General description: {fuelType} driven {drivetrain} {bodyType}
        </li>
        <li>
          {exteriorColor && `${exteriorColor} exterior color. `}
          {interiorColor && `${interiorColor} interior color. `}
          {engineSize && `${engineSize} liter engine. `}
          {description}
        </li>
      </ul>
      <h3>${price}</h3>
    </main>
  )
}