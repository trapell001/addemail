import React, { Component } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import EmployeeService from '../services/EmailService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emails: [],
            showModal: false,
            currentEmail: {
                id: '',
                userName: '',
                password: '',
                webhook: ''
            },
            newEmail: {
                userName: '',
                password: '',
                webhook: ''
            }
        };

        this.addEmail = this.addEmail.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
        this.fetchEmails = this.fetchEmails.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({
            showModal: false,
            currentEmail: { id: '', userName: '', password: '', webhook: '' },
            newEmail: { userName: '', password: '', webhook: '' }
        });
    }

    handleAddChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            newEmail: {
                ...prevState.newEmail,
                [name]: value
            }
        }));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            currentEmail: {
                ...prevState.currentEmail,
                [name]: value
            }
        }));
    }

    componentDidMount() {
        this.fetchEmails();
    }

    addEmail() {
        EmployeeService.createEmployee(this.state.newEmail).then(res => {
            this.setState(prevState => ({
                emails: [...prevState.emails, res.data],
                showModal: false,
                newEmail: { userName: '', password: '', webhook: '' }
            }));
        });
    }

    editEmail(id) {
        const email = this.state.emails.find(email => email.id === id);
        this.setState({ currentEmail: { ...email }, showModal: true });
    }

    deleteEmail(id) {
        EmployeeService.deleteEmail(id).then(res => {
            this.setState(prevState => ({
                emails: prevState.emails.filter(email => email.id !== id)
            }));
        });
    }

    fetchEmails() {
        EmployeeService.getEmail().then(res => {
            this.setState({ emails: res.data });
        });
    }

    updateEmail() {
        EmployeeService.updateEmail(this.state.currentEmail.id, this.state.currentEmail).then(res => {
            this.setState(prevState => ({
                emails: prevState.emails.map(email =>
                    email.id === prevState.currentEmail.id ? prevState.currentEmail : email
                ),
                showModal: false,
                currentEmail: { id: '', userName: '', password: '', webhook: '' }
            }));
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Email</h2>
                <br />
                <div className="container">
                    <Button variant="primary" onClick={this.handleShow} className="mb-3">
                        Add Notification
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Password</th>
                            <th>Webhook</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.emails.map(email => (
                            <tr key={email.id}>
                                <td>{email.userName}</td>
                                <td>{email.password}</td>
                                <td>{email.webhook}</td>
                                <td>
                                    <Button
                                        onClick={() => this.editEmail(email.id)}
                                        variant="info"
                                        className="me-2"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() => this.deleteEmail(email.id)}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.currentEmail.id ? 'Update Email' : 'Add Email'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Notification</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    value={
                                        this.state.currentEmail.userName ||
                                        this.state.newEmail.userName
                                    }
                                    onChange={
                                        this.state.currentEmail.id
                                            ? this.handleChange
                                            : this.handleAddChange
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password" // Changed to password type for better security
                                    name="password"
                                    value={
                                        this.state.currentEmail.password ||
                                        this.state.newEmail.password
                                    }
                                    onChange={
                                        this.state.currentEmail.id
                                            ? this.handleChange
                                            : this.handleAddChange
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Webhook</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="webhook"
                                    value={
                                        this.state.currentEmail.webhook ||
                                        this.state.newEmail.webhook
                                    }
                                    onChange={
                                        this.state.currentEmail.id
                                            ? this.handleChange
                                            : this.handleAddChange
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        {this.state.currentEmail.id ? (
                            <Button variant="primary" onClick={this.updateEmail}>
                                Save Changes
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={this.addEmail}>
                                Add
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ListEmployeeComponent;
