import React, { Component } from "react";

import RecentRideInformation from "./RecentRideInformation";

import { getRides } from "../../../actions/rideActions";
import {connect} from "react-redux";


class RecentRides extends Component {

    state = {
        //rankings ainda não existem
        //lado servidor converter id_user_driver para boleanos
        //lado do servidor popular um array de passageiros para as rides
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
    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Boleias recentes</h1>
                <button onClick = {this.props.getRides}>TEST</button>
                {this.props.rideState.rides.toString()}
                {this.state.rides.map(element => <RecentRideInformation ride={element} />)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({//conectar o estado para o reducer
    rideState: state.rideReducer
});

export default connect(mapStateToProps, { getRides })(RecentRides);//deixa aceder às actions, liga tudo!
