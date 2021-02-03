import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";

import GR from '../../../images/GR.png';

import MyRideDetails from "./MyRideDetails";
import AlertDialog from "../../base/AlertDialog";
import { deleteRide } from "../../../actions/rideActions";


class MyRideInformation extends Component {

    //Botão anular só  para aparecer se o utilizador for o dono da boleia

    state = {
        dialogOpen: false,
        dialogTitle: "Anular Boleia?",
        dialogContent: "Tem a certeza que pretende anular a boleia? Esta açção é irreversível!"
    };

    static propTypes = {
        ride: PropTypes.object.isRequired
    }

    delete = () => {
        this.props.deleteRide(this.props.user, this.props.ride.id_hitchhikes)
    }

    onAgreeAction = () => {
        this.props.deleteRide(this.props.user, this.props.ride.id_hitchhikes)
        this.setState({ dialogOpen: false })
    };

    onDisagreeAction = () => {
        this.setState({ dialogOpen: false })
    };

    onDeleteAction = () => {
        this.setState({ dialogOpen: true })
    };

    render() {
        return (
            <>
                <AlertDialog
                    open={this.state.dialogOpen}
                    title={this.state.dialogTitle}
                    content={this.state.dialogContent}
                    agreeAction={this.onAgreeAction}
                    disagreeAction={this.onDisagreeAction}
                />
                <div style={{ width: "100%" }}>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={GR} style={{ height: "80px", width: "132px" }} />
                            <div style={{ marginLeft: "0.5em", textAlign: "left", fontWeight: "bold" }}>
                                Condutor(a):  {this.props.ride.user_name}{/*Ranking: {this.props.ride.ranking}*/}  <br />
                        Vai sair em: {moment(this.props.ride.departure_time).format("DD-MM-YYYY [às] HH:mm [horas]")}<br />
                        Origem: {this.props.ride.departure_location}<br />
                        Destino: {this.props.ride.arrival_location}
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ fontWeight: "bold" }}>
                                {this.props.ride.id_user_driver} Oferece {this.props.ride.num_seats} lugar(es)<br />
                                <MyRideDetails ride={this.props.ride} user={this.props.user} /> <br />
                                {this.props.user != this.props.ride.id_users ?
                                    "" :
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={this.onDeleteAction}
                                        style={{ marginTop: "0.5em" }}><b>Anular</b></Button>}


                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({//conectar o estado para o reducer

});

export default connect(mapStateToProps, { deleteRide })(MyRideInformation);