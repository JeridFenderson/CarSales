import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { VehiclesController } from './VehiclesController'

export function SearchVehicles() {
  const [filterText, setFilterText] = useState('')
  const { path, id } = useParams()
  return (
    <main>
      {path === 'view' && !id && (
        <input
          type="text"
          placeholder="Make..."
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
      )}
      <VehiclesController filterText={filterText} />
    </main>
  )
}
