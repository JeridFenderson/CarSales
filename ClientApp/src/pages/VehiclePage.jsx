import { Header } from '../components/header/Header'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/footer/Footer'
import { VehicleDetails } from '../components/main/VehicleDetails'

export function VehiclePage() {
  return (
    <>
      <Header />
      <Nav />
      <VehicleDetails />
      <Footer />
    </>
  )
}
