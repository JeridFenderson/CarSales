import { Route, Switch } from 'react-router-dom'
import { VehiclesPage } from './pages/VehiclesPage'
import { UsersPage } from './pages/UsersPage'

export function App() {
  return (
    <Switch>
      <Route exact path="/vehicles/:path/">
        <VehiclesPage />
      </Route>
      <Route exact path="/vehicles/:path/:id">
        <VehiclesPage />
      </Route>
      <Route exact path="/vehicles/:path">
        <VehiclesPage />
      </Route>
      <Route exact path="/vehicles/:path/:id/:action">
        <VehiclesPage />
      </Route>
      <Route exact path="/signup">
        <UsersPage />
      </Route>
      <Route exact path="/login">
        <UsersPage />
      </Route>
    </Switch>
  )
}
