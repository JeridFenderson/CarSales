import { Header } from '../components/header/Header'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/footer/Footer'
import { VehicleController } from '../components/main/VehicleController'

export function VehicleControllerPage() {
  return (
    <>
      <Header />
      <Nav />
      <VehicleController />
      <Footer />
    </>
  )
}
