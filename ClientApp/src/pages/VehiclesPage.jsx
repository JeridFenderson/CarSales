import { Header } from '../components/header/Header'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/footer/Footer'
import { VehiclesLoader } from '../components/main/VehiclesLoader'

export function VehiclesPage() {
  return (
    <>
      <Header />
      <Nav />
      <VehiclesLoader />
      <Footer />
    </>
  )
}
