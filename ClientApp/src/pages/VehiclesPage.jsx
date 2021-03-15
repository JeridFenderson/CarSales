import { Header } from '../components/header/Header'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/footer/Footer'
import { SearchVehicles } from '../components/main/SearchVehicles'

export function VehiclesPage() {
  return (
    <>
      <Header />
      <Nav />
      <SearchVehicles />
      <Footer />
    </>
  )
}
