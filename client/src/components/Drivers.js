import React, { Component } from "react";

import RideInformation from "./rides/RideInformation";

class Drivers extends Component {

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
            }
        ],
    }


    render() {
        return (
            <div>
                <h1 style = {{textAlign: "center"}}>Condutores</h1>
                {this.state.rides.map(element => <RideInformation ride={element} />)}
            </div>
        );
    }
}

export default Drivers;