import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ProfileDetails from './components/ProfileDetails';
import Profiles from './components/Profiles';
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/profiles" component={Profiles} />
    <ProtectedRoute exact path="/profiles/:id" component={ProfileDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App;
