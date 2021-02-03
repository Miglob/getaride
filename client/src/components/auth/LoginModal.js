import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/authActions";

import { Modal, Form, Button, Alert } from "react-bootstrap";


class LoginModal extends Component {

    state = {
        modal: false,
        email: "",
        user_password: "",

        showAlert: false,
        alertMessage: ""
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    componentDidUpdate(previousProps) {
        const { isAuthenticated } = this.props;
        // If authenticated, close modal
        if (this.state.modal) { // if modal is open
            if (isAuthenticated) {
                this.closeModal();
            }
        }
    }

    closeModal = () => {
        this.setState({
            modal: false
        });
    }

    openModal = () => {
        this.setState({
            modal: true
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    formFieldsAreValid() {

        if (!this.state.email.trim().length > 0) {
            this.setState({
                showAlert: true,
                alertMessage: "Email inválido!"
            });
            return false;
        }

        if (!this.state.user_password.trim().length > 0) {
            this.setState({
                showAlert: true,
                alertMessage: "Password inválida!"
            });
            return false;
        }

        this.setState({
            showAlert: false,
            alertMessage: "Sem erros :)"
        });

        return (
            this.state.email.trim().length > 0 &&
            this.state.user_password.trim().length > 0
        )
    };

    deliver = (e) => {

        e.preventDefault();

        if (this.formFieldsAreValid()) {

            const { email, user_password } = this.state;

            const user = { email, user_password }

            // Attempt to login
            this.props.login(user);
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.openModal} style={{ marginLeft: "1em" }}>Login</Button>

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton style={{ backgroundColor: "#245c8d", color: "white" }} >
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.deliver}>
                            <Alert show={this.state.showAlert} variant={"danger"}>
                                {this.state.alertMessage}
                            </Alert>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.onChange} type="email" name="email" placeholder="email..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.onChange} type="password" name="user_password" placeholder="password..." />
                            </Form.Group>
                            <Button type="submit">Login</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
})

export default connect(mapStateToProps, { login })(LoginModal);


