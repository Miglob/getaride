import React, { Component } from "react";
import { connect } from "react-redux";


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";
import RegisterModal from "../auth/RegisterModal";


import Abc from '../../images/4.png';


class NavTopBar extends Component {

    state = {
        istrue: false
    };

    render() {
        return (
            <Navbar /*bg="light" */ expand="lg" style={{ minHeight: "10vh", backgroundColor: "#245c8d" }}>
                <Navbar.Brand href="/recentRides" style ={{alignItems: "center", display: "flex"}}>
                    <img
                        alt=""
                        src={Abc}
                        style={{ height: "60px", width: "111px" }}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <span style = {{marginLeft: "0.5em", fontSize: "35px", color: "whitesmoke"}}>Getaride</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="mr-auto" style ={{marginTop: "2.5em", color: "whitesmoke", fontSize: "20px"}}>
                        <Nav.Link href="/recentRides" >Boleias recentes</Nav.Link>
                        <Nav.Link href="/stuff">Sobre nós</Nav.Link>
                        {this.props.isAuthenticated ?
                            <NavDropdown title="Boleias">
                                <NavDropdown.Item href="/myRides">As minhas boleias</NavDropdown.Item>
                                <NavDropdown.Item href="/createRide">Criar Boleia</NavDropdown.Item>
                                <NavDropdown.Item href="/findRides">Encontrar Boleia</NavDropdown.Item>
                            </NavDropdown> : ""
                        }
                       {/*} <Nav.Link href="/ranking">Ranking</Nav.Link>*/}
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
