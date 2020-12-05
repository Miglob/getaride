import React, { Component } from "react";
import PropTypes from "prop-types";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

class MyRideDetails extends Component {

    //implementar o estado da boleia quando houver servidor
    //Não se pode manipular o estado do passageiro, só informativo
    
    state = {
        modalOpen: false
    }

    static propTypes = {
        ride: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.toggle} style={{ marginTop: "0.5em" }}>
                    <b>+ Detalhes</b>
                </Button>

                <Modal
                    show={this.state.modalOpen}
                    onHide={this.toggle}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Detalhes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Tem como boleia confirmada:</p>
                        <p>Nome: {this.props.ride.user_name}<span style={{ marginLeft: "1em" }}>Ranking: {this.props.ride.ranking}</span> </p>

                        {/*botao*/}


                        <p>Pormenores da boleia: </p>
                        <Row>
                            <Col>Origem: {this.props.ride.departure_location}</Col>
                            <Col> Destino: {this.props.ride.arrival_location}</Col>
                        </Row>
                        <Row>
                            <Col>Hora partida: {this.props.ride.departure_time}</Col>
                            <Col>Hora chegada: {this.props.ride.arrival_time}</Col>
                        </Row>

                        <p style={{ marginTop: "2em" }}>Passageiros: </p>

                        <div>
                            {
                                !!this.props.ride.passengers ?
                                    this.props.ride.passengers.map(passenger =>
                                        <Row style={{ display: "flex", alignItems: "center", margin: "0.5em auto" }}>
                                            <Col md= "4" >{passenger.user_name}</Col>
                                            <Col md= "2">
                                                <DropdownButton title={passenger.state} size="sm" style={{ marginLeft: "0.5em" }}  >
                                                    <Dropdown.Item onClick={() => alert("todo")}>Pendente</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => alert("todo")}>Confirmada</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => alert("todo")}>Cancelada</Dropdown.Item>
                                                </DropdownButton>
                                            </Col>
                                        </Row>
                                    ) : "Não existem passageiros"
                            }
                        </div>

                        <p style={{ marginTop: "2em" }}>Informações adicionais: </p>

                                 mensagens
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary">Criar mensagem</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default MyRideDetails;