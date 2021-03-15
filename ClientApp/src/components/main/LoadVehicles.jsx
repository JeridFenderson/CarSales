import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SelectVehicles } from './SelectVehicles'

export function LoadVehicles({ filterText }) {
  const { id } = useParams()

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
      let url = !filterText
        ? `/api/Vehicles`
        : `/api/Vehicles/?filterMake=${filterText}`
      if (id) url = `/api/Vehicles/${id}`
      const response = await fetch(url)
      const json = await response.json()
      setVehicles(json)
    }

    loadVehicles()
  }, [filterText, id])

  return <SelectVehicles vehicles={vehicles} />
}
