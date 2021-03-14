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
      <figure className="general" key={id}>
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
          <li>
            Odometer miles: {odometer}. {vin && `VIN: ${vin}. `}
            {fuelType} driven {drivetrain} {bodyType}
          </li>
          <li>
            {exteriorColor && `${exteriorColor} exterior color. `}
            {interiorColor && `${interiorColor} interior color. `}
            {engineSize && `${engineSize} liter engine. `}
            {description}
          </li>
          <li>
            <h3>${price}</h3>
          </li>
        </ul>
      </figure>
    </Link>
  )
}
