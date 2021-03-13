import React, { useState, useEffect } from 'react'
import { Vehicle } from './Vehicle'

export function VehicleList() {
  const [vehicles, setVehicles] = useState([
    {
      id: 0,
      year: 1885,
      make: 'Benz',
      model: 'Patent Motor Car',
      price: 825,
      odometer: 0,
      vin: '',
      fuelType: 'gas',
      driveTrain: 'direct',
      bodyType: 'wagon',
      exteriorColor: 'black',
      interiorColor: 'black',
      engineSize: 1,
      description: 'The first car on the road!',
    },
  ])

  useEffect(() => {
    async function loadVehicles() {
      const response = await fetch('/api/Vehicles')
      const json = await response.json()
      setVehicles(json)
    }

    loadVehicles()
  }, [])

  return (
    <>
      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle} />
      ))}
    </>
  )
}
