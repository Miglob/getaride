import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { addRide } from "../../actions/rideActions";


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
        num_seats: ""
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
    createRide = (event) => {
        let departureTime = moment(this.state.departure_time).format("yyyy-MM-DD HH:mm:ss");
        let arrivalTime = moment(this.state.arrival_time).format("yyyy-MM-DD HH:mm:ss");
        let ride = {
            departure_time: departureTime,
            arrival_time: arrivalTime,
            departure_location: this.state.departure_location,
            arrival_location: this.state.arrival_location,
            hitch_initial_text: this.state.hitch_initial_text,
            num_seats: this.state.num_seats,
            id_user_driver: this.props.user.id_users
        };
        this.props.addRide(ride, () => {
            window.location.pathname = "/recentRides";
        })
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center", fontWeight: "bold", color:"#245c8d" }}>Criar Boleia</h1>

                <OverlayTrigger trigger="click" placement="right" overlay={
                    <Popover id="popover-basic">
                        <Popover.Content>
                            departure_time: {this.state.departure_time.toString()}<br />
                            arrival_time: {this.state.arrival_time.toString()}<br />
                            departure_location: {this.state.departure_location}<br />
                            arrival_location: {this.state.arrival_location}<br />
                            hitch_initial_text: {this.state.hitch_initial_text}<br />
                            num_seats: {this.state.num_seats}<br />
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
                                <Form.Label style={{ fontWeight: "bold", color:"#245c8d" }}>Origem da boleia</Form.Label>
                                <Form.Control onChange={this.onChange}
                                    name="departure_location"
                                    placeholder="Origem da boleia" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold", color:"#245c8d" }}>Destino da boleia</Form.Label>
                                <Form.Control onChange={this.onChange}
                                    name="arrival_location"
                                    placeholder="Destino da boleia"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "5em" }}>
                        <Col md={6}>
                            <Form.Group style={{ display: 'flex' }}>
                                <Form.Label style={{ marginRight: '8px', fontWeight: "bold", color:"#245c8d" }}>Lugares disponiveis</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    name="num_seats"
                                    placeholder="número lugares"
                                    min={1}
                                    type="number"
                                    style={{ width: '50%' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold", marginTop:"2.5em", color:"#245c8d" }}>Comentários</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    name="hitch_initial_text"
                                    placeholder="comentários..."
                                    as="textarea"
                                    rows={3}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    <Row style={{ marginTop: "5em" }}>
                        <Col md={9}></Col>
                        <Col md={3}>
                            <Button variant="danger" style={{ marginBottom: "1.5em" }}>Cancelar</Button>
                            <Button onClick={this.createRide} style={{ marginLeft: "2em", marginBottom: "1.5em" }}>Submeter</Button>
                        </Col>
                    </Row>
                </Form>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
})
export default connect(mapStateToProps, { addRide })(CreateRide);