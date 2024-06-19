import React, { Component } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
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
            },
            newNoti: {
                noti: ''
            }
        };

        this.editNoti = this.editNoti.bind(this);
        this.addNoti = this.addNoti.bind(this);
        this.deleteNoti = this.deleteNoti.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.updateNoti = this.updateNoti.bind(this);
        // this.saveNoti = this.saveNoti.bind(this);
    }
    componentDidMount() {
        this.fetchNotis();
    }
    handleShow() {
        this.setState({ showModal: true });
    }
    handleClose() {
        this.setState({ showModal: false, currentNoti: { id: '', noti: '' }, newNoti: { noti: '' } });
    }
    handleAddChange(e) {
        const { name, value } = e.target;
        this.setState({ newNoti: { [name]: value } });
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
    addNoti() {
        NotiService.createNoti(this.state.newNoti).then(res => {
            this.setState(prevState => ({
                notis: [...prevState.notis, res.data],
                showModal: false,
                newNoti: { noti: '' }
            }));
        });
    }

    editNoti(id) {
        const noti = this.state.notis.find(noti => noti.id === id);
        this.setState({ currentNoti: { ...noti }, showModal: true });
    }



    deleteNoti(id) {
        NotiService.deleteNoti(id).then(res => {
            this.setState(prevState => ({
                notis: prevState.notis.filter(noti => noti.id !== id)
            }));
        });
    }



    fetchNotis() {
        NotiService.getNoti().then((res) => {
            this.setState({ notis: res.data });
        });
    }



    updateNoti() {
        NotiService.updateNoti(this.state.currentNoti.id, this.state.currentNoti).then(res => {
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
                    <Table striped bordered hover>
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
                                    <Button onClick={() => this.editNoti(noti.id)} variant="info" className="me-2">Update</Button>
                                    <Button onClick={() => this.deleteNoti(noti.id)} variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>

                <Button variant="primary" onClick={this.handleShow}>
                    Add Notification
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.currentNoti.id ? 'Update Notification' : 'Add Notification'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Notification</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="noti"
                                    value={this.state.currentNoti.noti || this.state.newNoti.noti}
                                    onChange={this.state.currentNoti.id ? this.handleChange : this.handleAddChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        {this.state.currentNoti.id ?
                            <Button variant="primary" onClick={this.updateNoti}>
                                Save Changes
                            </Button> :
                            <Button variant="primary" onClick={this.addNoti}>
                                Add
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NotiComponent;
