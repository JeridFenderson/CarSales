import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/vehicles.scss'

export function Vehicle({ vehicle, display }) {
  const {
    id,
    vin,
    lotSpot,
    price,
    year,
    make,
    model,
    trim,
    body_style,
    seats,
    transmission,
    drivetrain,
    fuel_type,
    vehicle_type,
    condition,
    state_of_vehicle,
    images,
    status,
    mileage,
    description,
  } = vehicle

  return (
    <Link to={`/vehicles/view/${id}`}>
      <figure className={display}>
        {(images && images.length > 0 && (
          <img src={images[0].url} alt={`${year} ${make} ${model}`} />
        )) || <img alt={`${year} ${make} ${model}`} />}
        <ul>
          <li>
            <h2>
              {year} {make} {model} {trim && trim}
            </h2>
          </li>
          <li className="tablet">
            Odometer miles: {mileage.value}. {vin && `VIN: ${vin}. `}
            {fuel_type} Powered {drivetrain} {body_style}
          </li>
          <li className="desktop">{description}</li>
          <li>
            {(status === 'SOLD' && <h3 className="isSold">SOLD</h3>) || (
              <h3>
                ${price} {lotSpot && `Lot Spot: ${lotSpot}`}
              </h3>
            )}
          </li>
        </ul>
      </figure>
    </Link>
  )
}
