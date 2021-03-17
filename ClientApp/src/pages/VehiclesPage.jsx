import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { SearchVehicles } from '../components/main/vehicles/SearchVehicles'

export function VehiclesPage() {
  return (
    <>
      <Header />
      <SearchVehicles />
      <Footer />
    </>
  )
}
