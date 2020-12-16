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
            <Navbar bg="light" expand="lg" style={{ minHeight: "10vh" }}>
                <Navbar.Brand href="/recentRides">
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
                        <Nav.Link href="/recentRides">Boleias recentes</Nav.Link>
                        <Nav.Link href="/stuff">Stuff</Nav.Link>
                        <NavDropdown title="Boleias">
                            <NavDropdown.Item href="/myRides">As tuas boleias</NavDropdown.Item>
                            <NavDropdown.Item href="/createRide">Criar Boleia</NavDropdown.Item>
                            <NavDropdown.Item href="/findRides">Encontrar Boleia</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/ranking">Ranking</Nav.Link>
                    </Nav>
                    <Button variant="outline-primary"
                        style={{ marginRight: "2.5em" }}>Sign up</Button>{' '}
                    <OverlayTrigger key="bottom"
                        placement="bottom"
                        overlay={<Tooltip id={`tooltip-bottom`}>eu ainda não funciono :D</Tooltip>}>
                        <Button variant="secondary">Login</Button>
                    </OverlayTrigger>
                    <Button variant="outline-primary"
                        style={{ marginLeft: "2.5em" }}>Sair</Button>{' '}

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavTopBar;