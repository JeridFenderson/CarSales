import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/vehicle.scss'

export function VehicleDetails({ vehicle, singleVehicle }) {
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

  return (
    <>
      {singleVehicle && (
        <p className="back-arrow">
          <Link to="/vehicles">
            <i className="fas fa-backward"></i>
          </Link>
        </p>
      )}
      <h2>
        {year} {make} {model}
      </h2>
      <figure className="vehicle">
        <img
          src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt={`${year} ${make} ${model}`}
        />
      </figure>
      <ul>
        <li>
          {odometer && `Odometer miles: ${odometer}. `}
          {vin && `VIN: ${vin}`}
          {drivetrain &&
            `General description: ${fuelType} driven ${drivetrain} ${bodyType}`}
        </li>
        <li>
          {exteriorColor && `${exteriorColor} exterior color. `}
          {interiorColor && `${interiorColor} interior color. `}
          {engineSize && `${engineSize} liter engine. `}
          {description}
        </li>
      </ul>
      <h3>{price && `$${price}`}</h3>
    </>
  )
}
