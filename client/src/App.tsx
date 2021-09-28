import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Home, Player } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/music/:id">
          <Player />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
