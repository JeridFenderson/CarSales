import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../../auth'
import '../../../css/vehicles.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css'

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
    condition,
    state_of_vehicle,
    images,
    status,
    mileage,
    features,
  } = vehicle

  const slides = []

  // for (let i = 0; i < images.Length; i++) {
  //   slides.push(
  //     <SwiperSlide key={i}>
  //       <img src={images[i].url} alt={`${year} ${make} ${model}`} />
  //     </SwiperSlide>
  //   )
  // }

  return (
    <>
      <p className="back-arrow">
        <Link to="/vehicles/view">
          <i className="fas fa-backward"></i>
        </Link>
      </p>
      <section>
        {(singleVehicle && (
          <h2>
            {year} {make} {model} {trim && trim}
          </h2>
        )) || (
          <h2>
            {year} {make} {model} {trim && trim}
          </h2>
        )}
        {images &&
          images.forEach((image, i) => {
            slides.push(
              <SwiperSlide key={i}>
                <img src={images[i].url} alt={`${year} ${make} ${model}`} />
              </SwiperSlide>
            )
          })}
        <Swiper id="main" className="vehicle">
          {slides}
        </Swiper>
        {/* <figure className="vehicle">
          {(images && images.length > 0 && (
            <img src={images[0].url} alt={`${year} ${make} ${model}`} />
          )) || <img alt={`${year} ${make} ${model}`} />}
        </figure> */}
        <aside>
          <ul>
            <h3>Description</h3>
            <li>{mileage && `${mileage.value} miles. VIN: ${vin}.`}</li>
            <li>
              {condition &&
                `${state_of_vehicle}, ${condition.toLowerCase()} condition, ${exterior_color.toLowerCase()} 
          exterior, ${interior_color.toLowerCase()} interior, ${seats} seater ${body_style.toLowerCase()}.`}
            </li>
            <li>
              {engineDisplacement &&
                `This ${body_style.toLowerCase()} has a ${engineDisplacement} liter ${fuel_type.toLowerCase()} engine. It's a ${transmission.toLowerCase()} with ${drivetrain}.`}
            </li>
            <li>
              {(status === 'SOLD' && <h3 className="isSold">SOLD</h3>) || (
                <h3>
                  {price && `$${price}`} {lotSpot && `Lot Spot: ${lotSpot}`}
                </h3>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <h3>Features</h3>
            </li>
            {features && features.map((feature) => <li>{feature.value}</li>)}
          </ul>
        </aside>

        {isLoggedIn() && currentUser.tier >= 1 && !notFound && (
          <aside>
            <ul>
              <li>
                <h3>Admin Information</h3>
              </li>
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
      </section>
    </>
  )
}
