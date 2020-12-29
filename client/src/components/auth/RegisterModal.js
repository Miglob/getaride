import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/authActions";

import { Modal, Form, Button } from "react-bootstrap";


class RegisterModal extends Component {

    state = {
        modal: false,
        user_name: "",
        email: "",
        user_password: ""
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

        return (
            this.state.user_name.trim().length > 0 &&
            this.state.email.trim().length > 0 &&
            this.state.user_password.trim().length > 0
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
                    <Modal.Header closeButton>
                        <Modal.Title>Registar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.deliver}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control onChange={this.onChange} name="user_name" placeholder="nome..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.onChange} name="email" placeholder="email..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.onChange} name="user_password" placeholder="password..." />
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