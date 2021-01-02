import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";

import GR from '../../../images/GR.png';

import MyRideDetails from "./MyRideDetails";
import { deleteRide } from "../../../actions/rideActions";


class MyRideInformation extends Component {

    //Botão anular só  para aparecer se o utilizador for o dono da boleia

    static propTypes = {
        ride: PropTypes.object.isRequired
    }

    delete = () => {
        this.props.deleteRide(this.props.user, this.props.ride.id_hitchhikes)
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={GR} style={{ height: "80px", width: "132px" }} />
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
                            <MyRideDetails ride={this.props.ride} user={this.props.user} /> <br />
                            <Button
                                size="sm"
                                variant="danger"
                                disabled={this.props.user != this.props.ride.id_users}
                                onClick={this.delete}
                                style={{ marginTop: "0.5em" }}><b>Anular</b></Button>

                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({//conectar o estado para o reducer

});

export default connect(mapStateToProps, { deleteRide })(MyRideInformation);