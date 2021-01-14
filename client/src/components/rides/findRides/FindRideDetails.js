import React, { Component } from "react";
import { connect } from "react-redux";

import { createPassenger, createMessage } from "../../../actions/rideActions";
import PropTypes from "prop-types";


import moment from "moment";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class FindRideDetails extends Component {

    //implementar o estado da boleia quando houver servidor?????
    //Condutor não se pode associar à própria boleia

    state = {
        modalOpen: false, 
        message: ""
    }

    static propTypes = {
        ride: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    createPassenger = () => {

        this.props.createPassenger(this.props.user.id_users, this.props.ride.id_hitchhikes)
    }

    createMessage = () => {

        if(!!this.state.message && this.state.message.trim().length > 0)
        {
            this.props.createMessage(this.state.message, this.props.user.id_users, this.props.ride.id_hitchhikes, false);
            this.setState({
                message: ""
              });
      

        }
    }

    checkIfUserIsPassenger = () => {
        let result = false;
        if (!!this.props.ride.passengers && !!this.props.user) {
            this.props.ride.passengers.forEach(element => {
                if (element.id_user == this.props.user.id_users) {
                    result = true;
                }
            });
        }
        return result;
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                    <Modal.Header closeButton style= {{ backgroundColor: "#245c8d", color: "whitesmoke" }}>
                        <Modal.Title>Detalhes</Modal.Title>

                        <Button onClick={this.createPassenger}
                            disabled={!this.props.user || (this.props.user && this.props.user.id_users === this.props.ride.id_users) || (this.props.user && this.checkIfUserIsPassenger())}
                            style={{ marginLeft: "65%" }}>Associar à boleia</Button>
                    </Modal.Header>
                    <Modal.Body style = {{ fontFamily: "Verdana"}}>
                        <h3 style={{ fontWeight: "bold" }}>Detalhes da boleia:</h3>
                        <p>Nome: {this.props.ride.user_name}{/*<span style={{ marginLeft: "1em" }}>Ranking: {this.props.ride.ranking}</span>*/} </p>

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

                        <h5 style={{ marginTop: "2em", fontWeight: "bold", marginTop: "2em" }}>Passageiros: </h5>

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

                        <h5 style= {{ marginTop: "2em", fontWeight: "bold", marginTop: "2em" }}>Informações adicionais: </h5>
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
                                ) : "Não existem passageiros"
                        }
                    </Modal.Body>
                    <Modal.Footer style= {{ backgroundColor:"#245c8d"}}>
                        <Row style={{ width: "100%", alignItems: "center" }}>
                            <Col md={9}>
                                <Form.Group >
                                    <Form.Label style= {{ fontWeight: "bold", color: "white"}}>Comentários</Form.Label>
                                    <Form.Control
                                        onChange={this.onChange}
                                        name="message"
                                        placeholder="comentários..."
                                        as="textarea"
                                        rows={3}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Button variant="primary" onClick = {this.createMessage} style={{ marginRight: "2em" }}>Criar mensagem</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps, { createPassenger, createMessage })(FindRideDetails);