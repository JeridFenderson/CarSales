import React from 'react'
import { Vehicle } from './Vehicle'
import { VehicleDetails } from './VehicleDetails'

export function SelectVehicles({ vehicles }) {
  const notFound = {
    make: `Sorry my friend, vehicle not found...`,
    description: `It looks like the vehicle you're searching for isn't in our current inventory`,
  }

  if (!Array.isArray(vehicles)) {
    return (
      <VehicleDetails
        vehicle={vehicles}
        display="vehicle"
        singleVehicle={true}
      />
    )
  }

  switch (vehicles.length) {
    case 0:
      return <VehicleDetails vehicle={notFound} display="vehicle" />
    case 1:
      return vehicles.map((vehicle) => (
        <VehicleDetails key={vehicle.id} vehicle={vehicle} display="vehicle" />
      ))
    default:
      return vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle} display="vehicles" />
      ))
  }
}
