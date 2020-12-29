import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/authActions";

import Button from 'react-bootstrap/Button';

class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <Button onClick={this.props.logout} style = {{marginLeft : "1em"}}>
                    Logout
                </Button>
            </div>
        )
    }
}

export default connect(null, { logout })(Logout);
