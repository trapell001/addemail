// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Container, Nav, Navbar } from "react-bootstrap";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import NotiComponent from "./components/NotiComponent";

function App() {
    return (
        <Router>
            <>
                <Navbar bg="light" data-bs-theme="light">
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href="/email">Home</Nav.Link>
                            <Nav.Link href="/Noti">Noti</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <Switch>
                    <Route exact path="/email" component={ListEmployeeComponent} />
                    <Route exact path="/noti" component={NotiComponent} />
                    {/* Add more routes for other pages/components */}
                </Switch>
            </>
        </Router>
    );
}

export default App;
