import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MyRideDetails extends Component {

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


                        <p style={{ marginTop: "2em" }}>Informações adicionais: </p>

                                 mensagens
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default MyRideDetails;