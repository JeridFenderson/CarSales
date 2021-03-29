import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../../auth'
import '../../../css/vehicle.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Thumbs])

export function Vehicle({ vehicle, singleVehicle, notFound }) {
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

  const [thumbsSwiper, setThumbsSwiper] = useState()
  const slides = []
  const thumbs = []

  if (images != null) {
    console.log(images)
    for (let i = 0; i < images.length; i++) {
      slides.push(
        <SwiperSlide key={`slide-${i}`}>
          <img
            src={images[i].url}
            alt={`Slide ${i} ${year} ${make} ${model}`}
            className="slideImg"
          />
        </SwiperSlide>
      )
    }
    for (let i = 0; i < images.length; i++) {
      thumbs.push(
        <SwiperSlide key={`thumb-${i}`}>
          <img
            src={images[i].url}
            alt={`Thumbnail ${i} ${year} ${make} ${model}`}
            className="thumbnail"
          />
        </SwiperSlide>
      )
    }
  }

  return (
    <>
      <Swiper
        id="main"
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        pagination
        spaceBetween={0}
        slidesPerView={1}
      >
        {slides}
      </Swiper>
      <Swiper
        id="thumbs"
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={3}
      >
        {thumbs}
      </Swiper>
      <p>Other Content On Page</p>
    </>
  )
}
