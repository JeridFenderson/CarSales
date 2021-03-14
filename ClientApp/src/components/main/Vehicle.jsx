import React from 'react'
import { Link } from 'react-router-dom'

export function Vehicle({ vehicle }) {
  const {
    id,
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
    <Link to={`/vehicles/${id}`}>
      <figure key={id}>
        <img
          src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt={`${year} ${make} ${model}`}
        />
        <ul>
          <li>
            <h2>
              {year} {make} {model}
            </h2>
          </li>
          <li className="tablet">
            {odometer && `${odometer} miles`}
            {engineSize && ` on this ${engineSize} liter`}
            {fuelType && `, ${fuelType.toLowerCase()} powered`}{' '}
            {bodyType && `${bodyType.toLowerCase()}`}
          </li>
          <li className="desktop">
            {vin && `VIN: ${vin}. `}
            {drivetrain && `${drivetrain}. `}
            {exteriorColor && `${exteriorColor} exterior color. `}
            {interiorColor && `${interiorColor} interior color. `}
            {description}
          </li>
          <li>
            <h3>{price && `$${price}`}</h3>
          </li>
        </ul>
      </figure>
    </Link>
  )
}
