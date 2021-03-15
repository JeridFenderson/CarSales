import { Route, Switch } from 'react-router-dom'
import { VehiclesPage } from './pages/VehiclesPage'
import { CreateVehiclePage } from './pages/CreateVehiclePage'
import { EnterUserPage } from './pages/EnterUserPage'

export function App() {
  return (
    <Switch>
      <Route exact path="/vehicles">
        <VehiclesPage />
      </Route>
      <Route exact path="/vehicles/:id">
        <VehiclesPage />
      </Route>
      <Route exact path="/signup">
        <EnterUserPage />
      </Route>
      <Route exact path="/login">
        <EnterUserPage />
      </Route>
      <Route exact path="/create">
        <CreateVehiclePage />
      </Route>
    </Switch>
  )
}
