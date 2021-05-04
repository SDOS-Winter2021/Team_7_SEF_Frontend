import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Button, Col, Row, Container, Breadcrumb, Jumbotron } from 'react-bootstrap';

function AddEPTaskForm(props) { //we are receiving donor as a prop here, so have access to donor id straight up

    return (
        <div className="App">
            <Formx donor={props.donor} />
        </div>
    )
}

export default AddEPTaskForm


function Formx(props) {
    const history = useHistory()
    //const getItems = () => APIService.GetReceipts(props.donor.PAN); //this has to be added to APIService 
    const [Donor, setDonor] = useState([])
    const [Date, setDate] = useState('')
    const [Task, setTask] = useState('')
    const [Receipts, setReceipts] = useState([]) //see EPUser and how there is getEP and how it is handled 
    const [ReceiptNumber, setReceiptNumber] = useState('')

    useEffect(() => {
        setDonor(props.donor.id)
        //add setReceiptNumber here 
        setDate('')
        setTask('')
        setReceiptNumber('')
        const getItems = () => APIService.GetReceipts(props.donor.PAN);
        getItems().then(data => setReceipts(data));
    }, [props])

    const [validated, setValidated] = useState(false);

    const addEPTask = (event) => {
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            APIService.AddEPTask({
                Donor,
                Task,
                Date, 
                ReceiptNumber
                //add receiptnumber here 
            })
                .then(resp => {
                    if (check(resp)) {
                        alert("New Task Added");
                        history.push('/donor/donorEP');
                    }
                }
                )
        }
        setValidated(true);
    }

    //will also have to setReceiptNumber see how title is set in add donor 
    //this is it
    const receiptNumberChangeHandler = (event) => {
        setReceiptNumber(event.target.value)
    }


    return (
        <div>
            <div className="row">
                <div className="col">
                    <Breadcrumb style={{width:500}}>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/donor">Donor</Breadcrumb.Item>
                        <Breadcrumb.Item href="/donor/donorEP">Donor Engagement Plan</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add Task</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="col">
                </div>
                <div className="col">
                </div>
            </div>
            <br />

            <span class='display-text' STYLE="font-weight:bold">
            <Container > {/*change the widht of the form (padding) */}
                <Jumbotron style={{ "background": "rgb(249, 249, 249)" }}>
                    <Form noValidate validated={validated}>

                    <Row><h4>Add Task</h4></Row>
                    <hr/>
                    <br/>

                    <Form.Group as={Row} controlId="validationReceiptNumber">
                        <Form.Label column sm={2}>Receipt Number <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                required
                                as='select'
                                type="text"
                                placeholder="Receipt Number"
                                value={ReceiptNumber}
                                onChange={receiptNumberChangeHandler.bind(this)}>
                                {Receipts.map(r => {
                                    return <option>{r}</option>
                                })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please select Receipt Number.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                        <Form.Group as={Row} controlId="validationTask">
                            <Form.Label column sm={2}>Task</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as='textarea'
                                    type="text"
                                    row={10}
                                    placeholder="Task"
                                    value={Task}
                                    onChange={e => setTask(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">Please enter the Task.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />

                        <Form.Group as={Row} controlId="validationDate">
                            <Form.Label column sm={2}>Date <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    required
                                    type="date"
                                    placeholder="Date"
                                    value={Date}
                                    onChange={e => setDate(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">Please enter the Date.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />
                        <br />
                        <br /> 

                        <Row className="md-center">
                            <Col sm={2}></Col>
                            <Col sm={4}>
                                <Button block href='/donor/donorEP' className="btn btn-danger">Cancel</Button>
                            </Col>
                            <Col sm={4}>
                                <Button block onClick={addEPTask} className="btn btn-success">Add Task</Button>
                            </Col>
                        </Row>
                    </Form>
                </Jumbotron>
            </Container>
            </span>
        </div>
    )
}

function check(resp) {
    if (resp.id === undefined) {
        return false;
    }
    else {
        return true;
    }
}