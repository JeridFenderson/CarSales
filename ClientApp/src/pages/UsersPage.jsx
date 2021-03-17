import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { UsersController } from '../components/main/users/UsersController'

export function UsersPage() {
  return (
    <>
      <Header />
      <UsersController />
      <Footer />
    </>
  )
}
