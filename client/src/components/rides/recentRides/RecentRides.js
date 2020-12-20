import React, { Component } from "react";

import RecentRideInformation from "./RecentRideInformation";

import { getRides } from "../../../actions/rideActions";
import {connect} from "react-redux";


class RecentRides extends Component {

    state = {
        //rankings ainda não existem
        //lado do servidor popular um array de passageiros para as rides
        //lado do servidor devolver as próximas boleias
        //não interessa filtrar se o condutor é passageiro ou nao é etc
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
                        id_passengers: 1 ,
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
                        id_passengers: 2 ,
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
                        id_passengers: 3 ,
                        user_name: "Ricardo Carmo",
                        state: "Confirmada"
                    },
                    {
                        id_passengers: 4 ,
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
                {JSON.stringify(this.props.rideState.rides)}
                {this.state.rides.map(element => <RecentRideInformation ride={element} />)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({//conectar o estado para o reducer
    rideState: state.rideReducer
});

export default connect(mapStateToProps, { getRides })(RecentRides);//deixa aceder às actions, liga tudo!
