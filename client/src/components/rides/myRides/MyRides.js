import React, { Component } from "react";

import MyRideInformation from "./MyRideInformation";
import { getMyRides } from "../../../actions/rideActions";
import { connect } from "react-redux";


class MyRides extends Component {

    state= {
        initial : true
    }
    //rankings ainda não existem
    //lado do servidor popular um array de passageiros para as rides
    //filtrar do lado do servidor as boleias que já espiraram

    // componentDidMount() {

    //     this.props.getMyRides(this.props.authState.user.id_users);
    //     console.log(this.props.authState);
    // }

    componentWillReceiveProps(nextProps){
        if(this.state.initial){
            if(nextProps.authState.user){
                this.props.getMyRides(nextProps.authState.user.id_users);
                this.setState({initial : false});
            }
        }
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>As minhas boleias</h1>
                {  this.props.rideState.myRides.map(element => <MyRideInformation ride={element} user = {this.props.authState.user.id_users} />)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({//conectar o estado para o reducer
    rideState: state.rideReducer,
    authState: state.authReducer
});

export default connect(mapStateToProps, { getMyRides })(MyRides);