import { Route, Switch } from 'react-router-dom'
import { VehiclesPage } from './pages/VehiclesPage'
import { VehiclePage } from './pages/VehiclePage'
import { CreateVehiclePage } from './pages/CreateVehiclePage'

export function App() {
  return (
    <Switch>
      <Route exact path="/vehicles">
        <VehiclesPage />
      </Route>
      <Route exact path="/vehicles/:id">
        <VehiclePage />
      </Route>
      <Route exact path="/create">
        <CreateVehiclePage />
      </Route>
    </Switch>
  )
}
