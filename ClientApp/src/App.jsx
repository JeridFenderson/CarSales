import React from 'react'
import './css/custom.scss'
import { Header } from './components/header/Header'
import { Navbar } from './components/nav/Navbar'
import { Footer } from './components/footer/Footer'

export function App() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="year make model"
          />
          <ul>
            <li>
              <h2>Year Make Model</h2>
            </li>
            <li className="tablet">
              (Odometer Miles) mile (engine size in liters) liter (fuel type)
              (vehicle type)
            </li>
            <li className="desktop">
              Odometer Miles. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Odit perspiciatis nihil iure enim molestias eius at quasi
              ratione quae sint nemo modi.
            </li>
            <li>
              <h3>Price</h3>
            </li>
          </ul>
        </figure>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="year make model"
          />
          <ul>
            <li>
              <h2>Year Make Model</h2>
            </li>
            <li className="tablet">
              (Odometer Miles) mile (engine size in liters) liter (fuel type)
              (vehicle type)
            </li>
            <li className="desktop">
              Odometer Miles. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Odit perspiciatis nihil iure enim molestias eius at quasi
              ratione quae sint nemo modi.
            </li>
            <li>
              <h3>Price</h3>
            </li>
          </ul>
        </figure>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="year make model"
          />
          <ul>
            <li>
              <h2>Year Make Model</h2>
            </li>
            <li className="tablet">
              (Odometer Miles) mile (engine size in liters) liter (fuel type)
              (vehicle type)
            </li>
            <li className="desktop">
              Odometer Miles. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Odit perspiciatis nihil iure enim molestias eius at quasi
              ratione quae sint nemo modi.
            </li>
            <li>
              <h3>Price</h3>
            </li>
          </ul>
        </figure>
      </main>
      <Footer />
    </>
  )
}
