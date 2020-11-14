import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

import monkey1 from '../../images/monkey1.gif';



class RideInformation extends Component {

    static propTypes = {
        ride: PropTypes.object.isRequired
    }

    render() {
        return (
            <div style={{ marginBottom: "1em" }}>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={monkey1} style={{ height: "80px", width: "80px" }} />
                        <div style={{ marginLeft: "0.5em", textAlign: "left" }}>
                            {this.props.ride.name} Ranking: {this.props.ride.ranking} <br />
                        Vai sair em: {this.props.ride.date}<br />
                        Origem: {this.props.ride.departure}<br />
                        Destino: {this.props.ride.arrival}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                            Oferece: {this.props.ride.numSeats} lugares<br />
                            <Button size="sm" style={{ marginTop: "0.5em" }}><b>+ Detalhes</b></Button><br />
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