import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";



import GR from '../../../images/GR.png';

import FindRideDetails from "./FindRideDetails";



class FindRideInformation extends Component {

    static propTypes = {
        ride: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={GR} style={{ height: "80px", width: "132px" }} />
                        <div style={{ marginLeft: "0.5em", textAlign: "left", fontWeight:"bold" }}>
                        Condutor(a):  {this.props.ride.user_name} {/*Ranking: {this.props.ride.ranking} */}<br />
                        Vai sair em: {moment(this.props.ride.departure_time).format("DD-MM-YYYY [às] HH:mm [horas]")}<br />
                        Origem: {this.props.ride.departure_location}<br />
                        Destino: {this.props.ride.arrival_location}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style= {{ fontWeight:"bold"}}>
                        {this.props.ride.id_user_driver} Oferece { this.props.ride.num_seats} lugar(es)<br />
                            <FindRideDetails ride={this.props.ride}
                                user={this.props.user} /> <br />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default FindRideInformation;