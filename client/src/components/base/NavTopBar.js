import React, { Component } from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import queen from '../../images/queen1.gif';
import ipsLogo from '../../images/ipsLogo.png';

class NavTopBar extends Component {

    state = {
        istrue: false
    };

    render() {
        return (
            <Navbar bg="light" /*expand="lg"*/ style={{ minHeight: "10vh" }}>
                <Navbar.Brand href="/home">
                    <img
                        alt=""
                        src={queen}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Getaride
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/stuff">Stuff</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <OverlayTrigger key="bottom"
                        placement="bottom"
                        overlay={<Tooltip id={`tooltip-bottom`}>eu ainda não funciono :D</Tooltip>}>
                        <Button variant="secondary">Login</Button>
                    </OverlayTrigger>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavTopBar;