import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from 'react-bootstrap/Card';
//componentes
import NavTopBar from "./components/base/NavTopBar"
import Home from "./components/Home"
import Stuff from "./components/Stuff"
import MyRides from "./components/rides/MyRides"
import CreateRide from "./components/rides/CreateRide"
import FindRide from "./components/rides/FindRide"
import Drivers from "./components/Drivers"
import Passengers from "./components/Passengers"
import Ranking from "./components/Ranking"


function App() {
  return (
    <div className="App">

      <Router>

        <NavTopBar />

        <Card style={{ width: "80%", margin: "2em auto auto", padding: "2em" }}>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/stuff">
              <Stuff />
            </Route>
            <Route path="/myRides">
              <MyRides />
            </Route>
            <Route path="/createRide">
              <CreateRide />
            </Route>
            <Route path="/findRide">
              <FindRide />
            </Route>
            <Route path="/drivers">
              <Drivers />
            </Route>
            <Route path="/passengers">
              <Passengers />
            </Route>
            <Route path="/ranking">
              <Ranking />
            </Route>
            <Route path="/"> {/* este fica sempre em último, se todos os outros falharem calha neste */}
              <Home />
            </Route>
          </Switch>
        </Card>

      </Router >
    </div>
  );
}

export default App;
