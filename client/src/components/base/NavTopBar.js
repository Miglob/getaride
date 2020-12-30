import React, { Component } from "react";
import { connect } from "react-redux";


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";
import RegisterModal from "../auth/RegisterModal";

import queen from '../../images/queen1.gif';


class NavTopBar extends Component {

    state = {
        istrue: false
    };

    render() {
        return (
            <Navbar /*bg="light" */ expand="lg" style={{ minHeight: "10vh", backgroundColor: "#245c8d" }}>
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
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="mr-auto">
                        <Nav.Link href="/recentRides" >Boleias recentes</Nav.Link>
                        <Nav.Link href="/stuff">Stuff</Nav.Link>
                        {this.props.isAuthenticated ?
                            <NavDropdown title="Boleias">
                                <NavDropdown.Item href="/myRides">As tuas boleias</NavDropdown.Item>
                                <NavDropdown.Item href="/createRide">Criar Boleia</NavDropdown.Item>
                                <NavDropdown.Item href="/findRides">Encontrar Boleia</NavDropdown.Item>
                            </NavDropdown> : ""
                        }
                        <Nav.Link href="/ranking">Ranking</Nav.Link>
                    </Nav>
                    {this.props.isAuthenticated ? "" : <RegisterModal />}
                    {this.props.isAuthenticated ? "" : <LoginModal />}
                    {this.props.isAuthenticated ? `Olá ${this.props.user.user_name}` : ""}
                    {this.props.isAuthenticated ? <Logout /> : ""}


                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
})


export default connect(mapStateToProps, {})(NavTopBar);
