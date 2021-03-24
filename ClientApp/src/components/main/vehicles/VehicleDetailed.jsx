import React from 'react'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../../auth'
import '../../../css/vehicles.scss'

export function VehicleDetailed({ vehicle, singleVehicle, notFound }) {
  const currentUser = getUser()
  const {
    id,
    vin,
    lotSpot,
    price,
    year,
    make,
    model,
    trim,
    exterior_color,
    interior_color,
    engineDisplacement,
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
    searchPrice,
    offerCost,
    purchaseCost,
    listPrice,
    salePrice,
    isReferral,
    maintenance,
    mileage,
    description,
  } = vehicle

  return (
    <>
      {(singleVehicle && (
        <section>
          <p className="back-arrow">
            <Link to="/vehicles/view">
              <i className="fas fa-backward"></i>
            </Link>
          </p>
          <h2>
            {year} {make} {model} {trim && trim}
          </h2>
          <span></span>
        </section>
      )) || (
        <h2>
          {year} {make} {model} {trim && trim}
        </h2>
      )}
      <figure className="vehicle">
        {(images && images.length > 0 && (
          <img src={images[0].url} alt={`${year} ${make} ${model}`} />
        )) || <img alt={`${year} ${make} ${model}`} />}
      </figure>
      <ul>
        <li>{mileage && `Odometer miles: ${mileage.value}. VIN: ${vin}.`}</li>
        <li>{description}</li>
      </ul>
      {(status === 'SOLD' && <h3 className="isSold">SOLD</h3>) || (
        <h3>{price && `$${price}`}</h3>
      )}

      {isLoggedIn() && currentUser.tier >= 1 && !notFound && (
        <aside>
          <ul>
            <li>Posted by {currentUser.firstName}</li>
            <li>
              <Link to={`/vehicles/create/${id}/edit`}>Edit</Link>
            </li>
            {currentUser.tier >= 3 && (
              <li>
                <Link to={`/vehicles/create/${id}/delete`}>Delete</Link>
              </li>
            )}
          </ul>
        </aside>
      )}
    </>
  )
}
