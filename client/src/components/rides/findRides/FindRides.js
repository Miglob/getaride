import React, { Component } from "react";
import moment from "moment";

import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import FindRideInformation from "./FindRideInformation";


class FindRides extends Component {



    state = {

        searchName: "",
        searchDeparture: "",
        searchArrival: "",
        searchDate: "",

        searchResults: [],

        //rankings ainda não existem
        //lado servidor converter id_user_driver para boleanos????
        //falta botão para confirmar o user(passageiro) na boleia nos detalhes
   


        rides: [
            {
                user_name: "António",
                ranking: 3,
                departure_time: "2020-11-25 08:00:00",
                arrival_time: "2020-11-25 08:15:00",
                departure_location: "Setúbal",
                arrival_location: "IPS",
                num_seats: 3,
                id_user_driver: true,
                passengers: [
                    {
                        user_name: "Maria Albertina",
                        state: "Cancelada"
                    }
                ]
            },
            {
                user_name: "Mário",
                ranking: 2,
                departure_time: "2020-11-22 12:10:00",
                arrival_time: "2020-11-22 12:25:00",
                departure_location: "Paio Pires",
                arrival_location: "IPS",
                num_seats: 2,
                id_user_driver: true,
                passengers: [
                    {
                        user_name: "Margarida",
                        state: "Pendente"
                    }
                ]
            },
            {
                user_name: "Ricardo",
                ranking: 2,
                departure_time: "2020-11-22 12:10:00",
                arrival_time: "2020-11-22 12:25:00",
                departure_location: "Paio Pires",
                arrival_location: "IPS",
                num_seats: 2,
                id_user_driver: true,
                passengers: [
                    {
                        user_name: "Ricardo Carmo",
                        state: "Confirmada"
                    },
                    {
                        user_name: "Antonio",
                        state: "Confirmada"
                    },

                ]
            }
        ],
    }

    //life cicle methods - é chamado no final
    componentDidMount() {
        this.search();
    }

    normalize = (string) => {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    search = () => {

        var arr = [];

        if (!this.state.searchName && !this.state.searchDeparture && !this.state.searchArrival && !this.state.searchDate) {
            arr = this.state.rides;

        } else {
            this.state.rides.forEach(element => {

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
                <h1 style={{ textAlign: "center" }}>Encontrar Boleia</h1>
                <Form>
                    <h2 style={{ marginTop: "0.5em" }}>Pesquisar </h2>
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
                    <h2 style={{ marginTop: "0.5em" }}>Lista de boleias</h2>
                    {this.state.searchResults.map(element => <Row><FindRideInformation ride={element} /></Row>)}
                </Form>
            </div>

        );
    }
}

export default FindRides;