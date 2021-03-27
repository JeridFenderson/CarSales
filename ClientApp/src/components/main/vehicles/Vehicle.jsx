import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/vehicles.scss'

export function Vehicle({ vehicle, display }) {
  const {
    id,
    lotSpot,
    price,
    year,
    make,
    model,
    trim,
    images,
    status,
    mileage,
    description,
  } = vehicle

  return (
    <figure className={display}>
      <Link to={`/vehicles/view/${id}`}>
        {(images && images.length > 0 && (
          <img src={images[0].url} alt={`${year} ${make} ${model}`} />
        )) || <img alt={`${year} ${make} ${model}`} />}
        <ul>
          <li>
            <h3>
              {year} {make} {model} {trim && trim}
            </h3>
          </li>
          <li>{mileage && mileage.value} miles.</li>
          <li className="desktop">{description}</li>
          <li>
            {(status === 'SOLD' && <h3 className="isSold">SOLD</h3>) || (
              <h3>
                ${price} {lotSpot && `Lot Spot: ${lotSpot}`}
              </h3>
            )}
          </li>
        </ul>
      </Link>
    </figure>
  )
}
