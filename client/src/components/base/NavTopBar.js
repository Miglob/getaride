import React, { Component } from "react";
import { connect } from "react-redux";


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';

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
                <Navbar.Brand href="/recentRides" style={{ alignItems: "center", display: "flex" }}>
                    <img
                        alt=""
                        src={Abc}
                        style={{ height: "60px", width: "111px" }}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <span style={{ marginLeft: "0.5em", fontSize: "35px", color: "whitesmoke" }}>Getaride</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="mr-auto" style={{ marginTop: "2.5em", color: "whitesmoke", fontSize: "20px" }}>
                        <Nav.Link href="/recentRides">
                            <span style={{ color: "whitesmoke" }}>Boleias recentes</span>
                        </Nav.Link>
                        {this.props.isAuthenticated ?

                            <Dropdown style={{ paddingTop:"8px"}}>
                                <Dropdown.Toggle childBsPrefix="boleias">
                                    <span style={{ color: "whitesmoke", fontSize:"20px" }}>Boleias</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/myRides">As minhas boleias</Dropdown.Item>
                                    <Dropdown.Item href="/createRide">Criar Boleia</Dropdown.Item>
                                    <Dropdown.Item href="/findRides">Encontrar Boleia</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            : ""
                        }
                        {/*} <Nav.Link href="/ranking">Ranking</Nav.Link>*/}
                        <Nav.Link href="/stuff">
                            <span style={{ color: "whitesmoke" }}>Sobre nós</span>
                        </Nav.Link>
                    </Nav>
                    {this.props.isAuthenticated ? "" : <RegisterModal />}
                    {this.props.isAuthenticated ? "" : <LoginModal />}
                    {this.props.isAuthenticated ? <span style={{ fontWeight: "bold", color: "whitesmoke" }}>Olá {this.props.user.user_name}</span> : ""}
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




/*

<NavDropdown title="Boleias" style={{color:"whitesmoke"}}>
                                <NavDropdown.Item href="/myRides">As minhas boleias</NavDropdown.Item>
                                <NavDropdown.Item href="/createRide">Criar Boleia</NavDropdown.Item>
                                <NavDropdown.Item href="/findRides">Encontrar Boleia</NavDropdown.Item>
                            </NavDropdown>



*/
