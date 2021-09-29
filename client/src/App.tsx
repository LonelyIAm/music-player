import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Home, Player } from "./pages";

function App() {
  return (
    <Router>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/music/:id">
        <Player />
      </Route>
    </Router>
  );
}

export default App;
