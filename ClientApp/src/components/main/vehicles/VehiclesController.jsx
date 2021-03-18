import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { authHeader, getUser, isLoggedIn } from '../../../auth'
import '../../../css/form.scss'
import { SelectVehicles } from './SelectVehicles'

export function VehiclesController({ filterText }) {
  const currentUser = getUser()
  const history = useHistory()
  const { path, id, action } = useParams()
  const [dropzoneMessage, setDropzoneMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [formTrigger, setFormTrigger] = useState(false)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: setFilesToUpload,
  })

  const [vehicles, setVehicles] = useState([{ id: 0 }])

  const [vehicle, setVehicle] = useState({
    year: '',
    make: '',
    model: '',
    price: '',
    odometer: '',
    vin: '',
    fuelType: 'Gas',
    drivetrain: 'Automatic',
    bodyType: 'Sedan',
    exteriorColor: '',
    interiorColor: '',
    engineSize: '',
    description: '',
    isListed: false,
    isSold: false,
    photos: [],
  })

  const {
    year,
    make,
    model,
    price,
    odometer,
    vin,
    fuelType,
    drivetrain,
    bodyType,
    exteriorColor,
    interiorColor,
    engineSize,
    description,
    isListed,
    isSold,
    photos,
  } = vehicle

  useEffect(() => {
    async function loadVehicles() {
      let url = !filterText
        ? `/api/Vehicles`
        : `/api/Vehicles/?filterMake=${filterText}`
      if (id) url = `/api/Vehicles/${id}`
      const response = await fetch(url)
      const json = await response.json()
      setVehicles(json)
      if (path === 'create' && id) {
        setVehicle(json)
      }
    }
    if (
      path === 'view' ||
      (path === 'create' && id !== '' && action === 'edit')
    ) {
      loadVehicles()
    }
  }, [id, action, filterText, path])

  useEffect(() => {
    if (isUploading) {
      setDropzoneMessage('Uploading...')
    }
    if (isDragActive) {
      setDropzoneMessage('Drop the files here...')
    }
    if (!isUploading && !isDragActive) {
      setDropzoneMessage('Click or drag vehicle images here to upload!')
    }
  }, [isDragActive, isUploading])

  useEffect(() => {
    function handleFiles(filesToUpload) {
      Array.isArray(filesToUpload) &&
        filesToUpload.map(async (fileToUpload) => {
          const formData = new FormData()
          formData.append('file', fileToUpload)
          setIsUploading(true)
          try {
            const response = await fetch('/api/Media', {
              method: 'POST',
              headers: {
                ...authHeader(),
              },
              body: formData,
            })
            if (response.status === 200) {
              const apiResponse = await response.json()
              const photo = apiResponse.photo
              setVehicle((vehicle) => ({
                ...vehicle,
                photos: [...vehicle.photos, photo],
              }))
            } else {
              setErrorMessage('Unable to upload an image')
            }
          } catch {
            setErrorMessage('Unable to upload an image')
          }
          setIsUploading(false)
        })
    }
    handleFiles(filesToUpload)
  }, [filesToUpload])

  useEffect(() => {
    async function submitForm() {
      let url = '/api/Vehicles'
      let apiAction = 'POST'
      if (id) {
        switch (action) {
          case 'edit':
            url = `/api/Vehicles/${id}`
            apiAction = 'PUT'
            break
          case 'delete':
            url = `/api/Vehicles/${id}`
            apiAction = 'DELETE'
            break
          default:
            break
        }
      }
      await fetch(`${url}`, {
        method: `${apiAction}`,
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(vehicle),
      })
      history.push('/vehicles')
    }
    if (formTrigger || action === 'delete' || (path === 'create' && id === ''))
      submitForm()
  }, [formTrigger, action, history, id, vehicle, path])

  function handleStringFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.value })
  }

  function handleNumberFieldChange(event) {
    setVehicle({
      ...vehicle,
      [event.target.name]:
        Number(event.target.value) > 0 && Number(event.target.value) < 999999
          ? Number(event.target.value)
          : 0,
    })
  }

  function handleBooleanFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.checked })
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    setFormTrigger(true)
  }

  function Input(packet) {
    // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit]
    return (
      <p>
        <label htmlFor={packet[1].toLowerCase()}>{packet[1]}</label>
        <input
          type={packet[0]}
          name={packet[1].toLowerCase()}
          placeholder={packet[1]}
          value={packet[2]}
          onChange={packet[3]}
          required={packet[4]}
          maxLength={packet[5]}
        />
      </p>
    )
  }

  function BigInput(packet) {
    // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit,
    // 6 = name, 7 = list of options]
    return (
      <p>
        <label htmlFor={packet[6]}>{packet[1]}</label>
        {(packet[7] && (
          <select name={packet[6]} value={packet[2]} onChange={packet[3]}>
            {packet[7].map((choice) => (
              <option value={choice}>{choice}</option>
            ))}
          </select>
        )) || (
          <input
            type={packet[0]}
            name={packet[6]}
            placeholder={packet[1]}
            value={packet[2]}
            onChange={packet[3]}
            required={packet[4]}
            maxLength={packet[5]}
          />
        )}
      </p>
    )
  }

  if (path === 'view') {
    return <SelectVehicles vehicles={vehicles} />
  } else {
    return (
      <>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleFormSubmit}>
          <section>
            {Input(['text', 'Year', year, handleNumberFieldChange, true, 4])}
            {Input(['text', 'Make', make, handleStringFieldChange, true])}
            {Input(['text', 'Model', model, handleStringFieldChange, true])}
            {Input(['text', 'Price', price, handleNumberFieldChange, true])}
            {Input([
              'text',
              'Odometer',
              odometer,
              handleNumberFieldChange,
              true,
            ])}
            {Input(['text', 'VIN', vin, handleStringFieldChange, false])}
          </section>
          <section>
            {BigInput([
              '',
              'Fuel Type',
              fuelType,
              handleStringFieldChange,
              false,
              '',
              'fuelType',
              ['Gas', 'Diesel', 'Electric', 'Hybrid', 'Hydrogen'],
            ])}
            {BigInput([
              '',
              'Drivetrain',
              drivetrain,
              handleStringFieldChange,
              false,
              '',
              'drivetrain',
              ['Automatic', 'Manual', 'DCT', 'Direct Drive'],
            ])}
            {BigInput([
              '',
              'Body Type',
              bodyType,
              handleStringFieldChange,
              false,
              '',
              'bodyType',
              [
                'Sedan',
                'SUV',
                'Pickup Truck',
                'Minivan',
                'Coupe',
                'Convertible',
                'Hatchback',
                'Sports Car',
                'Station Wagon',
                'Other',
              ],
            ])}

            {BigInput([
              'text',
              'Exterior Color',
              exteriorColor,
              handleStringFieldChange,
              false,
              '',
              'exteriorColor',
            ])}
            {BigInput([
              'text',
              'Interior Color',
              interiorColor,
              handleStringFieldChange,
              false,
              '',
              'interiorColor',
            ])}

            {BigInput([
              'text',
              'Engine Size',
              engineSize,
              handleStringFieldChange,
              false,
              '',
              'engineSize',
            ])}
          </section>
          <section>
            <p>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={handleStringFieldChange}
                rows={4}
              />
            </p>
            <div className="file-drop-zone">
              <div {...getRootProps()}>
                <input {...getInputProps()} required />
                {dropzoneMessage}
              </div>
            </div>
            {photos.length > 0 &&
              photos.map((photo, index) => (
                <figure key={index}>
                  <img alt={`${year}${make} ${model}`} src={photo.url} />
                </figure>
              ))}
          </section>
          <section>
            {isLoggedIn() && currentUser.isAdmin && (
              <>
                <p>
                  <span></span>
                  <label htmlFor="isListed">List?</label>
                  <input
                    type="checkbox"
                    name="isListed"
                    checked={isListed}
                    onChange={handleBooleanFieldChange}
                  />
                  <span></span>
                </p>
                <p>
                  <span></span>
                  <label htmlFor="isSold">Sell?</label>
                  <input
                    type="checkbox"
                    name="isSold"
                    checked={isSold}
                    onChange={handleBooleanFieldChange}
                  />
                  <span></span>
                </p>
              </>
            )}
            {id && (
              <p className="back-arrow">
                <span></span>
                <Link to={`/vehicles/view/${id}`}>
                  <i className="fas fa-backward"></i>
                </Link>
              </p>
            )}
            <p>
              <span></span>
              <input type="submit" value="Submit" className="submit" />
              <span></span>
            </p>
          </section>
        </form>
      </>
    )
  }
}
