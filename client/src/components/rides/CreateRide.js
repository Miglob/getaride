import React, { Component } from "react";
import moment from "moment";

import DatePicker from "./DateSelector";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

class CreateRide extends Component {

    state = {
        departure_time: "",
        arrival_time: "",
        departure_location: "",
        arrival_location: "",
        hitch_initial_text: "",
        num_seats: "",
        id_user_driver: ""
    }
    //validar resultados antes de enviar para o servidor
    //id user vai sempre, na check box um bool que identifica se é condutor ou não, validação no servidor
    

    setDates = (date, startTime, endTime) => {

        var departure_time =
            moment(date).set({
                hour: moment(startTime).get("hour"),
                minute: moment(startTime).get("minute"),
                second: moment(startTime).get("second"),
            }).toDate()

        var arrival_time =
            moment(date).set({
                hour: moment(endTime).get("hour"),
                minute: moment(endTime).get("minute"),
                second: moment(endTime).get("second"),
            }).toDate()

        this.setState({
            departure_time,
            arrival_time
        })
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChangeDriver = (event) => {
        this.setState({
            id_user_driver: event.target.checked
        })
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Criar Boleia</h1>

                <OverlayTrigger trigger="click" placement="right" overlay={
                    <Popover id="popover-basic">
                        <Popover.Content>
                            departure_time: {this.state.departure_time.toString()}<br />
                            arrival_time: {this.state.arrival_time.toString()}<br />
                            departure_location: {this.state.departure_location}<br />
                            arrival_location: {this.state.arrival_location}<br />
                            hitch_initial_text: {this.state.hitch_initial_text}<br />
                            num_seats: {this.state.num_seats}<br />
                            id_user_driver: {"" + this.state.id_user_driver}
                        </Popover.Content>
                    </Popover>
                }>
                    <Button variant="success">Click me to see data</Button>
                </OverlayTrigger>


                <DatePicker setDates={this.setDates} />

                <Form style={{ marginTop: "5em" }}>
                    <Row>
                        <Col >
                            <Form.Group>
                                <Form.Label>Origem da boleia</Form.Label>
                                <Form.Control onChange={this.onChange} name="departure_location" placeholder="Origem da boleia" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Destino da boleia</Form.Label>
                                <Form.Control onChange={this.onChange} name="arrival_location" placeholder="Destino da boleia" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "5em" }}>
                        <Col md={4}>
                            <Form.Check
                                onChange={this.onChangeDriver}
                                name="id_user_driver"
                                type={"checkbox"}
                                label={"É Condutor?"}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Group style={{ display: 'flex' }}>
                                <Form.Label style={{ marginRight: '8px' }}>Lugares disponiveis</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    name="num_seats"
                                    placeholder="número lugares"
                                    min={1}
                                    type="number"
                                    style={{ width: '50%' }}
                                    disabled={!this.state.id_user_driver}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                    <Row style = {{marginTop: "5em"}}>
                        <Col md={8}>
                            <Button>Comentários</Button>
                        </Col>
                        <Col md={1}>
                            <Button variant="danger">Cancelar</Button>
                        </Col>
                        <Col md={3}>
                            <Button>Submeter</Button>
                        </Col>
                    </Row>
                </Form>
            </div >
        );
    }
}

export default CreateRide;