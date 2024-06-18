import React, { Component } from 'react';
import { Modal, Button, Form, Card, Col, Row } from 'react-bootstrap';
import EmployeeService from '../services/EmailService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emails: [],
            showModal: false,
            currentEmployee: {
                id: '',
                userName: '',
                password: '',
                webhook: ''
            }
        };

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployee(id) {
        const employee = this.state.emails.find(emp => emp.id === id);
        this.setState({ currentEmployee: employee, showModal: true });
    }

    componentDidMount() {
        EmployeeService.getEmail().then((res) => {
            this.setState({ emails: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false, currentEmployee: { id: '', userName: '', password: '', webhook: '' } });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                [name]: value
            }
        }));
    }

    updateEmployee() {
        EmployeeService.updateEmail(this.state.currentEmployee, this.state.currentEmployee.id).then(res => {
            this.setState(prevState => ({
                emails: prevState.emails.map(emp => (emp.id === prevState.currentEmployee.id ? prevState.currentEmployee : emp)),
                showModal: false,
                currentEmployee: { id: '', userName: '', password: '', webhook: '' }
            }));
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Emails</h2>
                <br />
                <div className="container">
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {this.state.emails.map(email => (
                            <Col key={email.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Text>
                                            <strong>Email:</strong> {email.userName}
                                            <br />

                                            <strong>Password:</strong> {email.password}
                                            <br />
                                            <strong>Webhook:</strong> {email.webhook}
                                        </Card.Text>
                                        <Button onClick={() => this.editEmployee(email.id)} variant="info" className="me-2">
                                            Update
                                        </Button>
                                        <Button onClick={() => this.viewEmployee(email.id)} variant="info">
                                            View
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>UserName</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    value={this.state.currentEmployee.userName}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="password"
                                    value={this.state.currentEmployee.password}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Webhook</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="webhook"
                                    value={this.state.currentEmployee.webhook}
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

export default ListEmployeeComponent;
