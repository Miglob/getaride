import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class RecentRideDetails extends Component {

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
                    <Modal.Header closeButton style={{ backgroundColor: "#245c8d", color: "whitesmoke" }}>
                        <Modal.Title>Detalhes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontFamily: "Verdana" }}>
                        <h3 style={{ fontWeight: "bold" }}>Detalhes da sua boleia:</h3>
                        <p>Nome do Condutor:  {this.props.ride.user_name}{/*<span style={{ marginLeft: "1em" }}>Ranking: {this.props.ride.ranking}</span> */}</p>

                        {/*botao*/}


                        <h5 style={{ fontWeight: "bold" }}>Pormenores da boleia: </h5>
                        <Row>
                            <Col style={{ fontWeight: "bold" }}>Origem: {this.props.ride.departure_location}</Col>
                            <Col style={{ fontWeight: "bold" }}> Destino: {this.props.ride.arrival_location}</Col>
                        </Row>
                        <Row>
                            <Col>Hora partida: {moment(this.props.ride.departure_time).format("DD-MM-yyyy HH:mm")}</Col>
                            <Col>Hora chegada: {moment(this.props.ride.arrival_time).format("DD-MM-yyyy HH:mm")}</Col>
                        </Row>

                        <h5 style={{ marginTop: "2em", fontWeight: "bold" }}>Passageiros: </h5>

                        <div>
                            {
                                !!this.props.ride.passengers ?
                                    this.props.ride.passengers.map(passenger =>
                                        <Row style={{ display: "flex", alignItems: "center", margin: "0.5em auto" }}>
                                            <Col md="3" >{passenger.user_name}</Col>
                                            <Col md="2">{passenger.state}</Col>
                                        </Row>
                                    ) : "Não existem passageiros"
                            }
                        </div>

                        <h5 style={{ marginTop: "2em", fontWeight: "bold" }}>Informações adicionais: </h5>
                        Mensagem inicial: {this.props.ride.hitch_initial_text}<br />
                            {
                                !!this.props.ride.messages ?
                                    this.props.ride.messages.map(message =>
                                        <Row style={{ display: "flex", alignItems: "center", margin: "0.5em auto" }}>
                                            <Col md="2" >{moment(message.mns_date).format("DD-MM-yyyy HH:mm")}H.</Col>
                                            <Col md="2">{message.user_name}</Col>
                                            <Col md="6">{message.mns_text}</Col>
                                            <Col md="2"></Col>
                                        </Row>
                                    ) : "Não existem mensagens de outros passageiros"
                            }
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default RecentRideDetails;