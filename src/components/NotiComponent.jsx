import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import NotiService from '../services/NotiService';

class NotiComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notis: [],
            showModal: false,
            currentNoti: {
                id: '',
                noti: ''
            }
        };

        this.editEmployee = this.editEmployee.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    editEmployee(id) {
        const noti = this.state.notis.find(noti => noti.id === id);
        this.setState({ currentNoti: noti, showModal: true });
    }

    componentDidMount() {
        NotiService.getNoti().then((res) => {
            this.setState({ notis: res.data });
        });
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false, currentNoti: { id: '', noti: '' } });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            currentNoti: {
                ...prevState.currentNoti,
                [name]: value
            }
        }));
    }

    updateEmployee() {
        NotiService.updateNoti(this.state.currentNoti, this.state.currentNoti.id).then(res => {
            this.setState(prevState => ({
                notis: prevState.notis.map(noti => (noti.id === prevState.currentNoti.id ? prevState.currentNoti : noti)),
                showModal: false,
                currentNoti: { id: '', noti: '' }
            }));
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Notifications</h2>
                <br />
                <div className="container">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Notification</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.notis.map(noti => (
                            <tr key={noti.id}>
                                <td>{noti.noti}</td>
                                <td>
                                    <button onClick={() => this.editEmployee(noti.id)} className="btn btn-info me-2">Update</button>
                                    <button onClick={() => this.viewEmployee(noti.id)} className="btn btn-info">View</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Notification</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="noti"
                                    value={this.state.currentNoti.noti}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.updateEmployee}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NotiComponent;
