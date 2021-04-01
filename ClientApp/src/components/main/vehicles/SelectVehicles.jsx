import React from 'react'
import { Vehicles } from './Vehicles'
import { Vehicle } from './Vehicle'

export function SelectVehicles({ vehicles }) {
  // const notFoundImg = {
  //   url:
  //     'https://images.unsplash.com/photo-1577059023365-cb3d8a8e1e9c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDd8fHBhcmtpbmclMjBzcGFjZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  // }
  // const notFound = {
  //   make: `No vehicles here...`,
  //   year: '',
  //   model: '',
  //   description: `It looks like the vehicle you're searching for isn't in our current inventory`,
  //   photos: [notFoundImg],
  // }

  if (!Array.isArray(vehicles)) {
    return <Vehicle vehicle={vehicles} singleVehicle={true} notFound={false} />
  }

  // switch (vehicles.length) {
  //   case 0:
  //     return (
  //       <Vehicle vehicle={notFound} singleVehicle={false} notFound={true} />
  //     )
  //   case 1:
  //     return vehicles.map((vehicle) => (
  //       <Vehicle
  //         key={vehicle.id}
  //         vehicle={vehicle}
  //         singleVehicle={false}
  //         notFound={false}
  //       />
  //     ))
  //   default:
  return vehicles.map((vehicle) => (
    <Vehicles key={vehicle.id} vehicle={vehicle} display="vehicles" />
  ))
  // }
}
