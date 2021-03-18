import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/vehicles.scss'

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
    isListed,
    isSold,
    photos,
  } = vehicle

  return (
    <Link to={`/vehicles/view/${id}`}>
      <figure className={display}>
        {(photos && photos.length > 0 && (
          <img src={photos[0].url} alt={`${year} ${make} ${model}`} />
        )) || <img alt={`${year} ${make} ${model}`} />}
        <ul>
          <li>
            <h2>
              {year} {make} {model}
            </h2>
          </li>
          <li className="tablet">
            Odometer miles: {odometer}. {vin && `VIN: ${vin}. `}
            {fuelType} Powered {drivetrain} {bodyType}
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
