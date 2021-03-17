import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VehiclesController } from './VehiclesController'

export function SearchVehicles() {
  const [filterText, setFilterText] = useState('')
  const [mainClass, setMainClass] = useState('')
  const { path, id } = useParams()

  useEffect(() => {
    if (path === 'create') {
      setMainClass('main-form')
    } else if (path === 'view') {
      setMainClass('main-vehicles')
    } else {
      setMainClass('')
    }
  }, [path])

  return (
    <main className={mainClass}>
      {path === 'view' && !id && (
        <input
          type="text"
          placeholder="Make..."
          value={filterText}
          id="search-bar"
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
      )}
      <VehiclesController filterText={filterText} />
    </main>
  )
}
