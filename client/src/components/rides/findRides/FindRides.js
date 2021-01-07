import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import { getRides } from "../../../actions/rideActions";

import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import FindRideInformation from "./FindRideInformation";


class FindRides extends Component {


    //rankings ainda não existem
    //falta botão para confirmar o user(passageiro) na boleia nos detalhes
    //servidor filtrar as boleias no qual o utilizador faz parte

    state = {

        searchName: "",
        searchDeparture: "",
        searchArrival: "",
        searchDate: "",

        searchResults: [],
    }

    componentWillMount() {
        this.props.getRides();
    }

    //life cicle methods - é chamado no final
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.rideState.lastUpdated !== this.props.rideState.lastUpdated) {
            this.search();
        }
    }


    normalize = (string) => {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    search = () => {

        var arr = [];

        if (!this.state.searchName && !this.state.searchDeparture && !this.state.searchArrival && !this.state.searchDate) {
            arr = this.props.rideState.rides;
        } else {
            this.props.rideState.rides.forEach(element => {

                if (
                    (!this.state.searchName || (!!this.state.searchName && this.normalize(element.user_name).includes(this.normalize(this.state.searchName)))) &&
                    (!this.state.searchDeparture || (!!this.state.searchDeparture && this.normalize(element.departure_location).includes(this.normalize(this.state.searchDeparture)))) &&
                    (!this.state.searchArrival || (!!this.state.searchArrival && this.normalize(element.arrival_location).includes(this.normalize(this.state.searchArrival)))) &&
                    (!this.state.searchDate || (!!this.state.searchDate && moment(element.departure_time).isSame(moment(this.state.searchDate), "day")))) {
                    arr.push(element);
                }
            });
        }

        this.setState({
            searchResults: arr
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.search())
    }

    setSearchDate = (searchDate) => {
        this.setState({
            searchDate
        }, () => this.search())
    }

    render() {
        return (

            <div>
                <h1 style={{ textAlign: "center", fontWeight:"bold" }}>Encontrar Boleia</h1>
                <Form>
                    <h2 style={{ marginTop: "0.5em", fontWeight:"bold" }}>Pesquisar </h2>
                    <Row>
                        <Col>
                            <Form.Group >
                                <Form.Control
                                    placeholder="Nome"
                                    onChange={this.onChange}
                                    name="searchName" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Control
                                    placeholder="Origem"
                                    onChange={this.onChange}
                                    name="searchDeparture" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Control
                                    placeholder="Destino"
                                    onChange={this.onChange}
                                    name="searchArrival" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <DatePicker
                                placeholderText="Data de saída"
                                onChange={searchDate => this.setSearchDate(searchDate)}
                                name="searchDate"
                                dateFormat="dd-MM-yyyy"
                                selected={this.state.searchDate} />
                        </Col>

                    </Row>
                    <h2 style={{ marginTop: "0.5em", fontWeight:"bold" }}>Lista de boleias</h2>
                    {this.state.searchResults.map(element => <Row><FindRideInformation ride={element} 
                    user={this.props.user} /></Row>)}
                </Form>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({//conectar o estado para o reducer
    rideState: state.rideReducer,
    user: state.authReducer.user
});

export default connect(mapStateToProps, { getRides })(FindRides);