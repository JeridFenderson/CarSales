import React from 'react'
import { Vehicle } from './Vehicle'
import { VehicleDetailed } from './VehicleDetailed'

export function SelectVehicles({ vehicles }) {
  const notFound = {
    make: `Sorry my friend, vehicle not found...`,
    description: `It looks like the vehicle you're searching for isn't in our current inventory`,
  }

  if (!Array.isArray(vehicles)) {
    return <VehicleDetailed vehicle={vehicles} singleVehicle={true} />
  }

  switch (vehicles.length) {
    case 0:
      return <VehicleDetailed vehicle={notFound} singleVehicle={false} />
    case 1:
      return vehicles.map((vehicle) => (
        <VehicleDetailed
          key={vehicle.id}
          vehicle={vehicle}
          singleVehicle={false}
        />
      ))
    default:
      return vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle} display="vehicles" />
      ))
  }
}
