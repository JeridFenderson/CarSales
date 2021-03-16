import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/vehicles.scss'

export function Vehicle({ vehicle, display }) {
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
    isSold,
  } = vehicle

  return (
    <Link to={`/vehicles/${id}`}>
      <figure className={display}>
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
            Odometer miles: {odometer}. {vin && `VIN: ${vin}. `}
            {fuelType} driven {drivetrain} {bodyType}
          </li>
          <li className="desktop">
            {exteriorColor && `${exteriorColor} exterior color. `}
            {interiorColor && `${interiorColor} interior color. `}
            {engineSize && `${engineSize} liter engine. `}
            {description}
          </li>
          <li>
            {(isSold && <h3 className="isSold">SOLD</h3>) || (
              <h3>{price && `$${price}`}</h3>
            )}
          </li>
        </ul>
      </figure>
    </Link>
  )
}
