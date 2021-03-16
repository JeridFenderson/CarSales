import { Header } from '../components/header/Header'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/footer/Footer'
import { UsersController } from '../components/main/users/UsersController'

export function UsersPage() {
  return (
    <>
      <Header />
      <Nav />
      <UsersController />
      <Footer />
    </>
  )
}
