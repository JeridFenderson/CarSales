import React from 'react'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../../auth'
import '../../../css/vehicles.scss'

export function VehicleDetailed({ vehicle, singleVehicle }) {
  const currentUser = getUser()
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
    user,
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
            {year} {make} {model}
          </h2>
          <span></span>
        </section>
      )) || (
        <h2>
          {year} {make} {model}
        </h2>
      )}
      <figure className="vehicle">
        {(photos && (
          <img src={photos[0].url} alt={`${year} ${make} ${model}`} />
        )) || <img alt={`${year} ${make} ${model}`} />}
      </figure>
      <ul>
        <li>
          {odometer && `Odometer miles: ${odometer}. `}
          {vin && `VIN: ${vin}`}
          {drivetrain &&
            `General description: ${fuelType} Powered ${drivetrain} ${bodyType}`}
        </li>
        <li>
          {exteriorColor && `${exteriorColor} exterior color. `}
          {interiorColor && `${interiorColor} interior color. `}
          {engineSize && `${engineSize} liter engine. `}
          {description}
        </li>
      </ul>
      {(isSold && <h3 className="isSold">SOLD</h3>) || (
        <h3>{price && `$${price}`}</h3>
      )}

      {isLoggedIn() && currentUser.isAdmin && (
        <aside>
          <ul>
            {user !== undefined && <li>Posted by {user.firstName}</li>}
            <li>
              <Link to={`/vehicles/create/${id}/edit`}>Edit</Link>
            </li>
            {currentUser.isOwner && (
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
