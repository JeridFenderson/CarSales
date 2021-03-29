import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VehiclesController } from './VehiclesController'

export function SearchVehicles() {
  const [filterText, setFilterText] = useState('')
  const [mainClass, setMainClass] = useState('')
  // @ts-ignore
  const { path, id } = useParams()

  useEffect(() => {
    if (path === 'create') {
      setMainClass('main-form')
    } else if (path === 'view' && id === undefined) {
      setMainClass('main-vehicles')
    } else if (path === 'view' && id !== undefined) {
      setMainClass('main-vehicle')
    } else {
      setMainClass('')
    }
  }, [id, path])

  return (
    <main className={mainClass}>
      {path === 'view' && !id && (
        <input
          type="search"
          placeholder="Make..."
          value={filterText}
          id="search-bar"
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
      )}
      <div className="vehicles-container">{VehiclesController(filterText)}</div>
    </main>
  )
}
