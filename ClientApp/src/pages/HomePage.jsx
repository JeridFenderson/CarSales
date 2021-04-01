import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import '../css/home.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Thumbs, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

SwiperCore.use([Navigation, Pagination, Thumbs, Autoplay])

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

export function HomePage() {
  let isDesktop = useMediaQuery('(min-width: 959px)')
  const [vehicles, setVehicles] = useState([
    { images: [], id: 0, year: 0, make: '', model: '' },
  ])

  useEffect(() => {
    async function loadVehicles() {
      const response = await fetch(`/api/Vehicles`)
      const json = await response.json()
      setVehicles(json)
    }
    loadVehicles()
  }, [])
  const slides = []

  if (vehicles != null && vehicles.length > 1) {
    for (let i = 0; i < vehicles.length; i++) {
      slides.push(
        <SwiperSlide key={`slide-${i}`}>
          <Link to={`/vehicles/view/${vehicles[i].id}`}>
            <img
              src={vehicles[i].images[0].url}
              alt={`Slide ${i} ${vehicles[i].year} ${vehicles[i].make} ${vehicles[i].model}`}
              className="slideImg"
            />
          </Link>
        </SwiperSlide>
      )
    }
  }

  return (
    <>
      <Header />
      <main className="main-home">
        <figure>
          <Swiper
            id="main"
            navigation
            pagination
            spaceBetween={0}
            slidesPerView={(isDesktop && 3) || 1}
            autoplay
          >
            {slides}
          </Swiper>
        </figure>
        <section>
          <h1>No Bullshit, Just Business</h1>
          <h2>
            At Cheap and Easy Auto, our number one priority is honesty, our
            number two is making money!
          </h2>
          <p>
            We pride ourselves on our simple business model. We do three things
            and three things only; find, buy, and sell used cars. In no
            particular order.
          </p>
          <p>
            A business is only as efficient as the system that it’s built on and
            the team runs it. Simply put, we’re damn good at what we do
            precisely because we don’t do much. Think of us as the McDonalds of
            the used car industry; not the best, but you know exactly what to
            expect. Great for when you’re in a pickle and need something fast,
            cheap and easy.
          </p>
        </section>
        <section>
          <h1>We Make Used Car Buying and Selling Easy and Affordable</h1>
          <h2>
            Need a new, to you, car? Need to sell your car? Both? Your quest
            ends here!
          </h2>
          <p>
            Give us your money, give us your car, or both! Bring your own cash
            for the best deals... but honestly, if you didn’t know that already,
            bring extra cash, because you obviously have a lot to spare.
          </p>
          <p>
            Seriously, get on it. Let’s go! Why are you still reading this? Less
            reading, more action. We only make money if you click on our ads or
            buy our cars. We’ve just shown you a piece of our priority one, now
            let us show you priority two.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
