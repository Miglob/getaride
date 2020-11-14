import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Card from 'react-bootstrap/Card';

import NavTopBar from "./components/base/NavTopBar"
import Home from "./components/Home"
import Home2 from "./components/Home copy"

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#f5f5f5" }}>

      <Router>

        <NavTopBar />

        <Card border="light" style={{ width: "80%", margin: "2em auto auto", padding:"2em" }}>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/link">
              <Home2 />
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
