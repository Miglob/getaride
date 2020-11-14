import React, { Component } from "react";

import monkey1 from '../images/monkey1.gif';
import WIP from '../images/WIP.png';

class Home extends Component {
    render() {
        return (
            <div>
                <h1 style={{ fontSize: "xx-large" }}>Home Page</h1>
                <img style={{ width: "150px" }} src={WIP} />
                <p />
                <img style={{ width: "500px" }} src={monkey1} />
            </div>
        );
    }
}

export default Home;