import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { authHeader, getUser, isLoggedIn } from '../../../auth'
import '../../../css/form.scss'
import { SelectVehicles } from './SelectVehicles'
import { Input, BigInput, OptionsInput, ButtonInput } from '../formInputs'

export function VehiclesController({ filterText }) {
  // @ts-ignore
  const { path, id, action } = useParams()
  const currentUser = getUser()
  const history = useHistory()
  const [mileageDisplay, setMileageDisplay] = useState('')
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
    vin: '',
    year: '',
    make: '',
    model: '',
    trim: '',
    exterior_color: '',
    interior_color: '',
    engineDisplacement: '',
    body_style: 'SEDAN',
    seats: '',
    transmission: 'AUTOMATIC',
    drivetrain: 'RWD',
    fuel_type: 'GASOLINE',
    vehicle_type: 'CAR_TRUCK',
    condition: 'GOOD',
    state_of_vehicle: 'Used',
    features: [],
    mileage: { value: 0, unit: '' },
    images: [],
    status: '',
    searchPrice: '',
    offerCost: '',
    purchaseCost: '',
    listPrice: '',
    salePrice: '',
    isReferral: false,
    maintenance: { task: '', description: '', cost: 0 },
  })

  const {
    vin,
    year,
    make,
    model,
    trim,
    exterior_color,
    interior_color,
    engineDisplacement,
    body_style,
    seats,
    transmission,
    drivetrain,
    fuel_type,
    vehicle_type,
    condition,
    state_of_vehicle,
    features,
    images,
    status,
    searchPrice,
    offerCost,
    purchaseCost,
    listPrice,
    salePrice,
    isReferral,
    maintenance,
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
      if (path === 'create' && id && status !== 'SOLD') {
        setVehicle(json)
      }
    }
    if (
      path === 'view' ||
      (path === 'create' && id !== '' && action === 'edit')
    ) {
      loadVehicles()
    }
  }, [id, action, filterText, path, status])

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
      await fetch(`${url}`, {
        method: `${apiAction}`,
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(vehicle),
      })
      history.push('/vehicles')
    }
    if (formTrigger || action === 'delete') submitForm()
  }, [formTrigger, action, history, id, vehicle, path])

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
          Number(event.target.value) > 0.01 &&
          Number(event.target.value) < 999999
            ? Number(event.target.value)
            : 0.01,
      },
    })
  }

  function handleBooleanFieldChange(event) {
    setVehicle({ ...vehicle, [event.target.name]: event.target.checked })
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    if (
      vehicle.status === 'PURCHASED' &&
      (vehicle.purchaseCost === '' || Number(vehicle.purchaseCost) < 0)
    ) {
      setErrorMessage(
        `How'd you find this deal ${currentUser.firstName}? Purchase it for at least a few dollars.`
      )
    } else if (
      vehicle.status === 'LISTED' &&
      (vehicle.listPrice === '' || Number(vehicle.listPrice) < 0)
    ) {
      setErrorMessage(
        `You can't list a vehicle for free ${currentUser.firstName}. You also must have a vehicle on record from a purchase action to list it.`
      )
    } else if (
      vehicle.status === 'SOLD' &&
      (vehicle.purchaseCost === '' || Number(vehicle.salePrice) < 0)
    ) {
      setErrorMessage(
        `Are you sure you meant to sell this vehicle for free? If so, sell it for $1, but be by the phone ${currentUser.firstName}.`
      )
    } else {
      console.log(vehicle)
      // setFormTrigger(true)
    }
  }

  if (path === 'view') {
    return SelectVehicles({ vehicles })
  } else {
    return (
      <>
        {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}
        <form onSubmit={handleFormSubmit}>
          <section>
            {Input(['text', 'VIN', vin, handleStringFieldChange, true])}
            {Input(['text', 'Year', year, handleNumberFieldChange, true, 4])}
            {Input(['text', 'Make', make, handleStringFieldChange, true])}
            {Input(['text', 'Model', model, handleStringFieldChange, true])}
            {Input(['text', 'Trim', trim, handleStringFieldChange, true])}
            {BigInput([
              'text',
              'Mileage',
              mileageDisplay,
              handleMileage,
              true,
              9,
              'mileage.value',
            ])}
            {OptionsInput([
              '',
              'Vehicle State',
              state_of_vehicle,
              handleStringFieldChange,
              false,
              '',
              'state_of_vehicle',
              [
                { name: 'Used', value: 'Used' },
                { name: 'Certified Pre-Owned', value: 'CPO' },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'New',
                    value: 'New',
                  },
              ],
            ])}
            {OptionsInput([
              '',
              'Vehicle Type',
              vehicle_type,
              handleStringFieldChange,
              false,
              '',
              'vehicle_type',
              [
                { name: 'Car', value: 'CAR_TRUCK' },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'Motorcycle',
                    value: 'MOTORCYCLE',
                  },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'Boat',
                    value: 'BOAT',
                  },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'Power Sport',
                    value: 'POWERSPORT',
                  },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'RV',
                    value: 'RV_CAMPER',
                  },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'Commercial',
                    value: 'COMMERCIAL',
                  },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'Trailer',
                    value: 'TRAILER',
                  },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'Other',
                    value: 'OTHER',
                  },
              ],
            ])}
            {BigInput([
              'text',
              'Engine Displacement (liters)',
              engineDisplacement,
              handleNumberFieldChange,
              true,
              3,
              'seats',
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
            {BigInput([
              'text',
              'Seats',
              seats,
              handleNumberFieldChange,
              true,
              2,
              'seats',
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
            <p>
              <button>Features</button>
            </p>
          </section>
          <section>
            {isLoggedIn() && currentUser.role === 'ADMIN' && (
              <p>
                <button>Did A Little Maintenance Already? Log it!</button>
              </p>
            )}
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
            {OptionsInput([
              '',
              'Status',
              status,
              handleStringFieldChange,
              true,
              '',
              'status',
              [
                { name: null, value: null },
                { name: 'Search Request', value: 'SEARCH_REQUESTED' },
                { name: 'Offer', value: 'OFFERED' },
                isLoggedIn() &&
                  currentUser.role === 'MANAGER' && {
                    name: 'Reject',
                    value: 'REJECTED',
                  },
                isLoggedIn() &&
                  currentUser.role === 'ADMIN' && {
                    name: 'Purchase',
                    value: 'PURCHASED',
                  },
                isLoggedIn() &&
                  currentUser.role === 'ADMIN' && {
                    name: 'Maintain',
                    value: 'MAINTAINED',
                  },
                isLoggedIn() &&
                  currentUser.role === 'ADMIN' && {
                    name: 'List',
                    value: 'LISTED',
                  },
                isLoggedIn() &&
                  currentUser.role === 'SOLD' && {
                    name: 'Sell',
                    value: 'SOLD',
                  },
              ],
            ])}
            {isLoggedIn() &&
              status === 'SEARCH_REQUESTED' &&
              BigInput([
                'text',
                'How much would you pay?',
                searchPrice,
                handleNumberFieldChange,
                false,
                '',
                'searchPrice',
              ])}
            {isLoggedIn() &&
              status === 'OFFERED' &&
              BigInput([
                'text',
                'How much do you want?',
                offerCost,
                handleNumberFieldChange,
                false,
                '',
                'offerCost',
              ])}
            {isLoggedIn() &&
              currentUser.role === 'ADMIN' &&
              status === 'PURCHASED' &&
              BigInput([
                'text',
                'Purchase Cost',
                purchaseCost,
                handleNumberFieldChange,
                false,
                '',
                'purchaseCost',
              ])}
            {isLoggedIn() &&
              currentUser.role === 'ADMIN' &&
              id &&
              status === 'LISTED' &&
              Number(vehicle.purchaseCost) > 0 &&
              BigInput([
                'text',
                'List For?',
                listPrice,
                handleNumberFieldChange,
                false,
                '',
                'listPrice',
              ])}
            {isLoggedIn() &&
              currentUser.role === 'MANAGER' &&
              id &&
              status === 'SOLD' &&
              Number(vehicle.listPrice) > 0 &&
              BigInput([
                'text',
                'Sold For?',
                salePrice,
                handleNumberFieldChange,
                false,
                '',
                'salePrice',
              ]) &&
              // Handle referral window
              ButtonInput([
                'checkbox',
                'Referred by someone?',
                isReferral,
                handleBooleanFieldChange,
                'isReferral',
              ])}
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
              <button type="submit" value="Submit">
                Done!
              </button>
              <span></span>
            </p>
          </section>
        </form>
      </>
    )
  }
}
