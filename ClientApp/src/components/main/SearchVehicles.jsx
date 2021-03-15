import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadVehicles } from './LoadVehicles'

export function SearchVehicles() {
  const [filterText, setFilterText] = useState('')
  const { id } = useParams()
  return (
    <main>
      {!id && (
        <input
          type="text"
          placeholder="Make..."
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
      )}
      <LoadVehicles filterText={filterText} />
    </main>
  )
}
