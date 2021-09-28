import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Player } from "./pages";

function App() {
  return (
    <Router>
      <Route path={["/", "/home"]} exact>
        <Home />
      </Route>
      <Route path="/music/:id">
        <Player />
      </Route>
    </Router>
  );
}

export default App;
