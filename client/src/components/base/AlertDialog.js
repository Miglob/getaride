import React from 'react';
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

class AlertDialog extends React.Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        title: PropTypes.object.isRequired,
        content: PropTypes.object.isRequired,
        agreeAction: PropTypes.func.isRequired,
        disagreeAction: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div>
                <Modal show={this.props.open}>
                    <Modal.Header style= {{ backgroundColor: "#245c8d", color:"white" }} >
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.content}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.disagreeAction} variant="primary">
                            Discordo
                        </Button>
                        <Button onClick={this.props.agreeAction} variant="danger" /*autoFocus*/>
                            Concordo
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AlertDialog;