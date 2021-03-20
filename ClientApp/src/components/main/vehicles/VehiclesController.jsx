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
  const [mileageDisplay, setMileageDisplay] = useState('')
  const [wasListedOrSearch, setWasListedOrSearch] = useState(false)
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
    mileage: { value: 0, unit: '' },
    vin: '',
    exterior_color: '',
    interior_color: '',
    body_style: 'SEDAN',
    transmission: 'AUTOMATIC',
    drivetrain: 'RWD',
    fuel_type: 'GASOLINE',
    description: '',
    trim: '',
    condition: 'GOOD',
    features: [],
    isSearchRequest: false,
    isListed: false,
    isSold: false,
    images: [],
  })

  const {
    year,
    make,
    model,
    price,
    vin,
    exterior_color,
    interior_color,
    body_style,
    transmission,
    drivetrain,
    fuel_type,
    description,
    trim,
    condition,
    features,
    isSearchRequest,
    isListed,
    isSold,
    images,
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
      setDropzoneMessage(
        'Click here or drag vehicle images right below to upload!'
      )
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
              const image = apiResponse.photo
              setVehicle((vehicle) => ({
                ...vehicle,
                images: [...vehicle.images, image],
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
      if (id && isSold && isSold !== wasListedOrSearch) {
        setErrorMessage('Unauthorized ')
      } else {
        await fetch(`${url}`, {
          method: `${apiAction}`,
          headers: { 'content-type': 'application/json', ...authHeader() },
          body: JSON.stringify(vehicle),
        })
        history.push('/vehicles')
      }
    }
    if (formTrigger || action === 'delete' || (path === 'create' && id === ''))
      submitForm()
  }, [
    formTrigger,
    action,
    history,
    id,
    vehicle,
    path,
    isSold,
    wasListedOrSearch,
  ])

  function handleStringFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.value })
  }

  function handleNumberFieldChange(event) {
    console.log(event.target.name)
    setVehicle({
      ...vehicle,
      [event.target.name]:
        Number(event.target.value) > 0 && Number(event.target.value) < 999999
          ? Number(event.target.value)
          : 0,
    })
  }

  function handleMileage(event) {
    setMileageDisplay(event.target.value)
    setVehicle({
      ...vehicle,
      mileage: {
        unit: 'MI',
        value:
          Number(event.target.value) > 0 && Number(event.target.value) < 999999
            ? Number(event.target.value)
            : 0,
      },
    })
  }

  function handleBooleanFieldChange(event) {
    console.log(vehicle)
    if (event.target.name === 'isSearchRequest') {
      setVehicle({
        ...vehicle,
        isSearchRequest: event.target.checked,
        isListed: !event.target.checked,
        isSold: !event.target.checked,
      })
    } else if (event.target.name === 'isListed') {
      if (id && vehicle.isListed) {
        setWasListedOrSearch(true)
      }
      setVehicle({
        ...vehicle,
        isListed: event.target.checked,
        isSearchRequest: !event.target.checked,
        isSold: !event.target.checked,
      })
    } else if (event.target.name === 'isSold') {
      if (id && (vehicle.isSearchRequest || vehicle.isListed)) {
        setWasListedOrSearch(true)
      }
      setVehicle({
        ...vehicle,
        isSold: event.target.checked,
        isSearchRequest: !event.target.checked,
        isListed: !event.target.checked,
      })
    } else {
      setVehicle({ ...vehicle, [event.target.name]: event.target.checked })
    }
  }

  function handleOptionsInputFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.checked })
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    // if ((!id && isListed) || (id && isListed !== wasListedOrSearch)) {
    //   setVehicle({ ...vehicle, date_First_On_Lot: dateAsString })
    // }
    // if (id && isSold && isSold === wasListedOrSearch) {
    //   setVehicle({ ...vehicle, date_Sold: dateAsString })
    // }

    // //---------------------
    // setFormTrigger(true)
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
        <label htmlFor={packet[1].toLowerCase()}>{packet[1]}</label>
        <input
          type={packet[0]}
          name={packet[6]}
          placeholder={packet[1]}
          value={packet[2]}
          onChange={packet[3]}
          required={packet[4]}
          maxLength={packet[5]}
        />
      </p>
    )
  }

  function OptionsInput(packet) {
    // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit,
    // 6 = name, 7 = list of options values]
    return (
      <p>
        <label htmlFor={packet[6]}>{packet[1]}</label>
        <select name={packet[6]} value={packet[2]} onChange={packet[3]}>
          {packet[7].map((choice) => (
            <option value={choice.value}>{choice.name}</option>
          ))}
        </select>
      </p>
    )
  }

  function ButtonInput(packet) {
    // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit,
    // 6 = name]
    return (
      <p>
        <span></span>
        <label htmlFor={packet[6]}>{packet[1]}</label>
        <input
          type={packet[0]}
          name={packet[6]}
          checked={packet[2]}
          onChange={packet[3]}
        />
        <span></span>
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
            {BigInput([
              'text',
              'Mileage',
              mileageDisplay,
              handleMileage,
              true,
              9,
              'mileage.value',
            ])}
            {Input(['text', 'VIN', vin, handleStringFieldChange, true])}
            {OptionsInput([
              '',
              'Condition',
              condition,
              handleStringFieldChange,
              false,
              '',
              'condition',
              [
                { name: 'Good', value: 'GOOD' },
                { name: 'Excellent', value: 'EXCELLENT' },
                { name: 'Fair', value: 'FAIR' },
                { name: 'Poor', value: 'POOR' },
                { name: 'Other', value: 'OTHER' },
              ],
            ])}
          </section>
          <section>
            {BigInput([
              'text',
              'Exterior Color',
              exterior_color,
              handleStringFieldChange,
              true,
              '',
              'exterior_color',
            ])}
            {BigInput([
              'text',
              'Interior Color',
              interior_color,
              handleStringFieldChange,
              false,
              '',
              'interior_color',
            ])}
            {Input(['text', 'Trim', trim, handleStringFieldChange, false])}
            {OptionsInput([
              '',
              'Body Style',
              body_style,
              handleStringFieldChange,
              false,
              '',
              'body_style',
              [
                { name: 'Sedan', value: 'SEDAN' },
                { name: 'Convertible', value: 'CONVERTIBLE' },
                { name: 'Coupe', value: 'COUPE' },
                { name: 'Crossover', value: 'CROSSOVER' },
                { name: 'Hatchback', value: 'HATCHBACK' },
                { name: 'Minivan', value: 'MINIVAN' },
                { name: 'Truck', value: 'TRUCK' },
                { name: 'Small Car', value: 'SMALL_CAR' },
                { name: 'SUV', value: 'SUV' },
                { name: 'Wagon', value: 'WAGON' },
                { name: 'Full Van', value: 'VAN' },
                { name: 'Other', value: 'OTHER' },
              ],
            ])}
            {OptionsInput([
              '',
              'Transmission',
              transmission,
              handleStringFieldChange,
              false,
              '',
              'transmission',
              [
                { name: 'Automatic', value: 'AUTOMATIC' },
                { name: 'Manual', value: 'MANUAL' },
                { name: 'Other', value: 'OTHER' },
              ],
            ])}
            {OptionsInput([
              '',
              'Drivetrain',
              drivetrain,
              handleStringFieldChange,
              false,
              '',
              'drivetrain',
              [
                { name: 'Rear Wheel Drive', value: 'RWD' },
                { name: 'Front Wheel Drive', value: 'FWD' },
                { name: 'All Wheel Drive', value: 'AWD' },
                { name: '4 by 4', value: '4X4' },
                { name: '4 by 2', value: '4X2' },
                { name: 'Other', value: 'OTHER' },
              ],
            ])}
            {OptionsInput([
              '',
              'Fuel Type',
              fuel_type,
              handleStringFieldChange,
              false,
              '',
              'fuel_type',
              [
                { name: 'Gas', value: 'GASOLINE' },
                { name: 'Diesel', value: 'DIESEL' },
                { name: 'Electric', value: 'ELECTRIC' },
                { name: 'Hybrid', value: 'HYBRID' },
                { name: 'Flex Fuel', value: 'FLEX' },
                { name: 'Other', value: 'OTHER' },
              ],
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
                required
              />
            </p>
            <p>
              <label htmlFor="features">Features</label>
              <button onClick={toggleFeatures}>Features</button>
              {/* <select
                name="features"
                value={[...features]}
                onChange={handleOptionsInputFieldChange}
              >
                <option>
                  {ButtonInput([
                    'checkbox',
                    'ABS Brakes',
                    [...features],
                    handleStringFieldChange,
                    '',
                    'abs_brakes',
                  ])}
                </option>
                <option>
                  {ButtonInput([
                    'checkbox',
                    'Adaptabe Cruise Control',
                    [...features],
                    handleStringFieldChange,
                    '',
                    'adaptive_cruise_control',
                  ])}
                </option>
              </select> */}
            </p>
            <div className="file-drop-zone">
              <div {...getRootProps()}>
                {/* Make input required -------------------------hello--------------- */}
                <input {...getInputProps()} />
                {dropzoneMessage}
              </div>
            </div>
            {images.length > 0 &&
              images.map((photo, index) => (
                <figure key={index}>
                  <img alt={`${year}${make} ${model}`} src={photo.url} />
                </figure>
              ))}
          </section>
          <section>
            {isLoggedIn() && currentUser.isAdmin && (
              <>
                {ButtonInput([
                  'checkbox',
                  'Vehicle is a search request?',
                  isSearchRequest,
                  handleBooleanFieldChange,
                  '',
                  'isSearchRequest',
                ])}
                {ButtonInput([
                  'checkbox',
                  'Vehicle is listed in inventory?',
                  isListed,
                  handleBooleanFieldChange,
                  '',
                  'isListed',
                ])}
                {ButtonInput([
                  'checkbox',
                  'Vehicle has been sold?',
                  isSold,
                  handleBooleanFieldChange,
                  '',
                  'isSold',
                ])}
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
              <input type="submit" value="Submit" />
              <span></span>
            </p>
          </section>
        </form>
      </>
    )
  }
}
