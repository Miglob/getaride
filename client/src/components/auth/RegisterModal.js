import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/authActions";

import { Modal, Form, Button, Alert } from "react-bootstrap";


class RegisterModal extends Component {

    state = {
        modal: false,
        user_name: "",
        email: "",
        user_password: "",
        user_password_confirm: "",

        showAlert: false,
        alertMessage: ""
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

        if (!this.state.user_name.trim().length > 0) {
            this.setState({
                showAlert: true,
                alertMessage: "Nome inválido!"
            });
            return false;
        }

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

        if (!this.state.user_password_confirm.trim().length > 0 ||
            !(this.state.user_password == this.state.user_password_confirm)) {
            this.setState({
                showAlert: true,
                alertMessage: "Password diferentes!"
            });
            return false;
        }

        this.setState({
            showAlert: false,
            alertMessage: "Sem erros :)"
        });
        
        return (
            this.state.user_name.trim().length > 0 &&
            this.state.email.trim().length > 0 &&
            this.state.user_password.trim().length > 0 &&
            this.state.user_password_confirm.trim().length > 0 &&
            this.state.user_password == this.state.user_password_confirm
        )
    };

    deliver = (e) => {

        e.preventDefault();

        if (this.formFieldsAreValid()) {

            const { user_name, email, user_password } = this.state;

            const user = { user_name, email, user_password }

            // Attempt to login
            this.props.register(user);

            this.setState(
                {
                    user_name: "",
                    email: "",
                    user_password: "",
                    user_password_confirm: "",
                },
                this.closeModal()
            );

        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.openModal}>Registar</Button>

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton style={{ backgroundColor: "#245c8d", color: "white" }}>
                        <Modal.Title>Registar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.deliver}>
                            <Alert show={this.state.showAlert} variant={"danger"}>
                                {this.state.alertMessage}
                            </Alert>

                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control onChange={this.onChange} name="user_name" placeholder="nome..." autocomplete="new-password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.onChange} type="email" name="email" placeholder="email..." autocomplete="new-password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.onChange} type="password" name="user_password" placeholder="password..." autocomplete="new-password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirmar Password</Form.Label>
                                <Form.Control onChange={this.onChange} type="password" name="user_password_confirm" placeholder="confirmar password..." autocomplete="new-password" />
                            </Form.Group>
                            <Button type="submit">Registar</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { register })(RegisterModal);