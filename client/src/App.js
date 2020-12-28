import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from 'react-bootstrap/Card';

//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/authActions'

//componentes
import NavTopBar from "./components/base/NavTopBar"
import RecentRides from "./components/rides/recentRides/RecentRides"
import Stuff from "./components/Stuff"
import MyRides from "./components/rides/myRides/MyRides"
import CreateRide from "./components/rides/CreateRide"
import FindRides from "./components/rides/findRides/FindRides"
import Ranking from "./components/Ranking"
import { Component } from 'react';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
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
                <Route path="/findRides">
                  <FindRides />
                </Route>
                <Route path="/ranking">
                  <Ranking />
                </Route>
                <Route path="/"> {/* este fica sempre em último, se todos os outros falharem calha neste */}
                  <RecentRides />
                </Route>
              </Switch>
            </Card>

          </Router >
        </div>
      </Provider>
    );
  }
}

export default App;
