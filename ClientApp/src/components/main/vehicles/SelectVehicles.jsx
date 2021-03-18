import React from 'react'
import { Vehicle } from './Vehicle'
import { VehicleDetailed } from './VehicleDetailed'

export function SelectVehicles({ vehicles }) {
  const notFoundImg = {
    url:
      'https://images.unsplash.com/photo-1577059023365-cb3d8a8e1e9c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDd8fHBhcmtpbmclMjBzcGFjZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  }
  const notFound = {
    make: `No vehicles here...`,
    description: `It looks like the vehicle you're searching for isn't in our current inventory`,
    photos: [notFoundImg],
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
