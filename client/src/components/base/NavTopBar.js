import React, { Component } from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import queen from '../../images/queen1.gif';
import ipsLogo from '../../images/ipsLogo.png';

class NavTopBar extends Component {

    state = {
        istrue: false
    };

    render() {
        return (

            <AppBar style={{ minWidth: "170px", minHeight: "100px", display: "flex", justifyContent: "center" }} position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <img src={queen} style={{ height: "80px", marginLeft: "2%", marginRight: "1%" }}></img>
                    <Typography variant="h4" >
                        Getaride
                    </Typography>
                    <img src={ipsLogo} style={{ height: "80px", marginRight: "15px", position: "absolute", right: "10%" }}></img>
                    <Button color="inherit" style={{ position: "absolute", right: "2%" }}>
                        <Typography variant="h6" >
                            Login
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavTopBar;