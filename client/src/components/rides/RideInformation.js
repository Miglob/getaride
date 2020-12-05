import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import Button from "react-bootstrap/Button";

import monkey1 from '../../images/monkey1.gif';
import MyRideDetails from "./MyRideDetails";



class RideInformation extends Component {

//Botão anular só  para aparecer se o utilizador for o dono da boleia

    static propTypes = {
        ride: PropTypes.object.isRequired
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={monkey1} style={{ height: "80px", width: "80px" }} />
                        <div style={{ marginLeft: "0.5em", textAlign: "left" }}>
                            {this.props.ride.user_name} Ranking: {this.props.ride.ranking} <br />
                        Vai sair em: {moment(this.props.ride.departure_time).format("DD-MM-YYYY [às] HH:mm [horas]")}<br />
                        Origem: {this.props.ride.departure_location}<br />
                        Destino: {this.props.ride.arrival_location}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                            {this.props.ride.id_user_driver ? ("Oferece: " + this.props.ride.num_seats + " lugares") : "Precisa de 1 lugar"}<br />
                            <MyRideDetails ride={this.props.ride}/> <br />   
                            <Button size="sm" variant="danger" style={{ marginTop: "0.5em" }}><b>Anular</b></Button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default RideInformation;