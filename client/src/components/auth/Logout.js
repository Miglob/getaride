import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/authActions";

import Button from 'react-bootstrap/Button';

class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    handleLogout = (event)=>{
        this.props.logout(event);
        window.location.pathname = "/";
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleLogout} style = {{marginLeft : "1em"}}>
                    Logout
                </Button>
            </div>
        )
    }
}

export default connect(null, { logout })(Logout);
