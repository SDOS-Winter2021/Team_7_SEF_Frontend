import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Button, Col, Row, Container, Breadcrumb, Jumbotron } from 'react-bootstrap';

function AddTransactionForm() {

    return (
        <div className="App">
            <Formx />
        </div>
    )
}

export default AddTransactionForm


function Formx() {
    const history = useHistory()
    const getItems = () => APIService.GetDonor();
    const [Receipt_Number, setReceipt_Number] = useState('')
    var Donor = ''
    const [DonorPAN, setDonorPAN] = useState('')
    const [Currency, setCurrency] = useState('')
    const [Amount, setAmount] = useState('')
    const [Date, setDate] = useState('')
    const [Mode_of_Payment, setMode_of_Payment] = useState('')
    const [DonorList, setDonorList] = useState('')

    useEffect(() => {
        getItems().then(data => setDonorList(data));
        setReceipt_Number('')
        setDonorPAN('')
        setCurrency('')
        setAmount('')
        setDate('')
        setMode_of_Payment('')
    }, [])

    const yourChangeHandler = (event) => {
        setMode_of_Payment(event.target.value)
    }

    const [validated, setValidated] = useState(false);
    var PANCheck = false;

    const addTransaction = (event) => {
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            DonorList.forEach(d => {
                if (DonorPAN !== '' && d.PAN === DonorPAN) {
                    PANCheck = true;
                    Donor = d.id;
                }
            })
            if (PANCheck && PANCheck === true) {
                APIService.AddTransaction({
                    Receipt_Number,
                    Donor,
                    Currency,
                    Amount,
                    Date,
                    Mode_of_Payment
                })
                    .then(resp => {
                        if (check(resp)) {
                            alert("New Transaction Added")
                            history.push('/transaction')
                        }
                        else {
                            console.log(resp)
                            alert("Error in Input")
                        }
                    }
                    )
            }
            else {
                alert("Donor with the given PAN doesn't Exist")
            }
        }
        setValidated(true);

    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/transaction">Transaction</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add Transaction</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="col">
                    <br />
                </div>
                <div className="col">
                    <br />
                </div>
                <div className="col">
                    <br />
                </div>
            </div>
            <br />
            <Container > {/*change the widht of the form (padding) */}
                <Jumbotron style={{ "background": "rgb(52, 58, 64)" }}>
                    <Form noValidate validated={validated}>

                        <Form.Group as={Row} controlId="validationReceipt_Number">
                            <Form.Label column sm={2}>Receipt Number <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Receipt Number"
                                    value={Receipt_Number}
                                    onChange={e => setReceipt_Number(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">Please enter Receipt Number.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />


                        <Form.Group as={Row} controlId="validationDonor">
                            <Form.Label column sm={2}>Donor <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Donor"
                                    value={DonorPAN}
                                    onChange={e => setDonorPAN(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">Please enter Donor.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />

                        <Form.Group as={Row} controlId="validationCurrency">
                            <Form.Label column sm={2}>Currency <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Currency"
                                    value={Currency}
                                    onChange={e => setCurrency(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">Please enter the Currency.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />

                        <Form.Group as={Row} controlId="validationAmount">
                            <Form.Label column sm={2}>Amount <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Amount"
                                    value={Amount}
                                    onChange={e => setAmount(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">Please enter the Amount.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />

                        <Form.Group as={Row} controlId="validationDate">
                            <Form.Label column sm={2}>Date <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={10}>
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

                        <Form.Group as={Row} controlId="validationMode_of_Payment">
                            <Form.Label column sm={2}>Mode of Payment <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    as='select'
                                    type="text"
                                    placeholder="Mode of Payment"
                                    value={Mode_of_Payment}
                                    onChange={yourChangeHandler.bind(this)}>
                                    <option value="">Choose</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Online">Online</option>
                                    <option value="Cash">Cash</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter the Mode of Payment.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />

                        <Row className="md-center">
                            <Col sm={4}>
                            </Col>
                            <Col sm={4}>
                                <Button block onClick={addTransaction} className="btn btn-success">Add Transaction</Button>
                            </Col>
                        </Row>
                    </Form>
                </Jumbotron>
            </Container>
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