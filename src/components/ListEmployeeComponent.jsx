import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emails: [],
            showModal: false,
            currentEmployee: {
                id: '',
                userName: '',
                password: '',
                webhook: ''
            }
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({emails: this.state.emails.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        const employee = this.state.emails.find(emp => emp.id === id);
        this.setState({ currentEmployee: employee, showModal: true });
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ emails: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    handleShow(){
        this.setState({ showModal: true });
    }

    handleClose(){
        this.setState({ showModal: false, currentEmployee: { id: '', userName: '', password: '', webhook: '' } });
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                [name]: value
            }
        }));
    }

    updateEmployee(){
        EmployeeService.updateEmployee(this.state.currentEmployee, this.state.currentEmployee.id).then(res => {
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
                 <h2 className="text-center">Email</h2>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> UserName</th>
                                    <th> Password</th>
                                    <th> Webhook </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.emails.map(
                                        email =>
                                        <tr key = {email.id}>
                                             <td> { email.userName} </td>
                                             <td> {email.password}</td>
                                             <td> {email.webhook}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(email.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(email.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(email.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

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
        )
    }
}

export default ListEmployeeComponent;
