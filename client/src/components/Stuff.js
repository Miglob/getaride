import React, { Component } from "react";

import monkey2 from '../images/monkey2.gif';

class Stuff extends Component {
    render() {
        return (
            <div>
                <h1 style={{ fontSize: "xx-large" }}>Stuff</h1>     
                <img style={{ width: "400px" }} src={monkey2} />
                <br />
                ao ver o que falta fazer
            </div>
        );
    }
}

export default Stuff;