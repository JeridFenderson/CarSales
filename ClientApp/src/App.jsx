import React, { useState, useEffect } from 'react'
import './css/custom.scss'
import { Header } from './components/header/Header'
import { Navbar } from './components/nav/Navbar'
import { Footer } from './components/footer/Footer'
import { VehicleList } from './components/main/VehicleList'

export function App() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <VehicleList />
      </main>
      <Footer />
    </>
  )
}
