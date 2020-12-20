import React, { Component } from "react";

import MyRideInformation from "./MyRideInformation";


class MyRides extends Component {

    //rankings ainda não existem
    //lado do servidor popular um array de passageiros para as rides
    //filtrar do lado do servidor as boleias que já espiraram
    state = {

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
                <h1 style={{ textAlign: "center" }}>As minhas boleias</h1>
                {this.state.rides.map(element => <MyRideInformation ride={element} />)}
            </div>
        );
    }
}

export default MyRides;