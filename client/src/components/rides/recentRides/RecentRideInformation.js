import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import GR from '../../../images/GR.png';

import RecentRideDetails from "./RecentRideDetails";



class RecentRideInformation extends Component {

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
                    <img src={GR} style={{ height: "80px", width: "132px" }} />
                        <div style={{ marginLeft: "0.5em", textAlign: "left", fontWeight:"bold" }}>
                        Condutor(a):  {this.props.ride.user_name}{/*} Ranking: {this.props.ride.ranking} */}<br />
                        Vai sair em: {moment(this.props.ride.departure_time).format("DD-MM-YYYY [às] HH:mm [horas]")}<br />
                        Origem: {this.props.ride.departure_location}<br />
                        Destino: {this.props.ride.arrival_location}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ fontWeight:"bold"}}>
                            {this.props.ride.id_user_driver} Oferece { this.props.ride.num_seats} lugar(es)<br />
                            <RecentRideDetails ride={this.props.ride}/> <br />   
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default RecentRideInformation;