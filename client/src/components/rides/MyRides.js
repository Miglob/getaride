import React, { Component } from "react";
import RideInformation from "./RideInformation";

class MyRides extends Component {

    state = {
        rides: [
            {
                name: "António",
                ranking: 3,
                date: "2020-11-25 08:00:00",
                departure: "Setúbal",
                arrival: "IPS",
                numSeats: 3
            },
            {
                name: "Mário",
                ranking: 2,
                date: "2020-11-22 12:10:00",
                departure: "Paio Pires",
                arrival: "IPS",
                numSeats: 2
            }
        ],
    }

    render() {
        return (
            <div>
                {this.state.rides.map(element => <RideInformation ride={element} />)}
            </div>
        );
    }
}

export default MyRides;