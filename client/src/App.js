import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Connections from './components/ConnectionsAuth/Connections'

function App() {
  return (
    <Switch>
      <Route exact path="/user**" component={Connections}/>
    </Switch>
  );
}

export default App;
