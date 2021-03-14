import React, { useState, useEffect } from 'react'
import { Vehicle } from './Vehicle'
import '../../css/vehicles.scss'

export function VehiclesLoader() {
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
  const notFound = {
    make: `Sorry my friend, vehicle not found...`,
    description: `It looks like the vehicle you're searching for isn't in our current inventory`,
  }
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    async function loadVehicles() {
      const url = !filterText.length
        ? `/api/Vehicles`
        : `/api/Vehicles/?filterMake=${filterText}`
      const response = await fetch(url)
      const json = await response.json()
      setVehicles(json)
    }

    loadVehicles()
  }, [filterText])

  return (
    <main className="vehicles">
      <input
        type="text"
        placeholder="Make..."
        value={filterText}
        onChange={function (event) {
          setFilterText(event.target.value)
        }}
      />
      {!vehicles.length ? (
        <Vehicle vehicle={notFound} />
      ) : (
        vehicles.map((vehicle) => (
          <Vehicle key={vehicle.id} vehicle={vehicle} />
        ))
      )}
    </main>
  )
}
