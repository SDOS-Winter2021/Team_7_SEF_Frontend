import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

function EditTransaction(props) {

    return (
        <div className="App">
            <Formx transaction={props.transaction} />
        </div>
    )
}

export default EditTransaction


function Formx(props) {
    const history = useHistory()
    const getItems = () => APIService.GetDonor();
    const [Receipt_Number, setReceipt_Number] = useState('')
    const [Donor, setDonor] = useState('')
    const [DonorPAN, setDonorPAN] = useState('')
    const [Currency, setCurrency] = useState('')
    const [Amount, setAmount] = useState('')
    const [Date, setDate] = useState('')
    const [Mode_of_Payment, setMode_of_Payment] = useState('')
    const [DonorList, setDonorList] = useState('')
    const [Is_Approved, setIs_Approved] = useState('')

    // const history = useHistory()

    useEffect(() => {
        getItems().then(data => setDonorList(data));
        setReceipt_Number(props.transaction.Receipt_Number)
        setDonor(props.transaction.Donor)
        setCurrency(props.transaction.Currency)
        setAmount(props.transaction.Amount)
        setDate(props.transaction.Date)
        setMode_of_Payment(props.transaction.Mode_of_Payment)
        setIs_Approved(props.transaction.Is_Approved)
    }, [props.transaction])

    const yourChangeHandler = (event) => {
        setMode_of_Payment(event.target.value)
    }

    const [validated, setValidated] = useState(false);
    var PANCheck = false;

    const updateTransaction = (event) => {
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            DonorList.forEach(d => {
                if (d.PAN === DonorPAN) {
                    PANCheck = true;
                    setDonor(d.id);
                }
            })
            if (PANCheck && PANCheck === true) {
                APIService.UpdateTransaction(props.transaction.id, {
                    Receipt_Number,
                    Donor,
                    Currency,
                    Amount,
                    Date,
                    Mode_of_Payment,
                    Is_Approved
                })
                alert("Transaction Entry Updated");
                history.push('/');
            }
            else {
                alert("Donor with the given PAN doesn't Exist")
            }
        }
        setValidated(true);
        
    }

    const deleteBtn = () => {
        var transaction_check = prompt("Please enter the POC of the Donor:", props.transaction.Poc);
        if (transaction_check === null || transaction_check !== props.transaction.Poc || transaction_check === "") {
            alert("Try Again, Transaction Name miss match")
        }
        else {
            APIService.DeleteTransaction(props.transaction.id)
                .catch(error => console.log(error))
            alert("Transaction Entry Deleted");
            history.push('/');
        }
    }

    return (
        <Container > {/*change the widht of the form (padding) */}
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



                <Row>
                    <Col sm={2}>
                    </Col>
                    <Col sm={4}>
                    <Button block onClick={updateTransaction} className="btn btn-success">Update Transaction</Button>
                    </Col>
                    <Col sm={1}>
                    </Col>
                    <Col sm={4}>
                    <Button block onClick={deleteBtn} className="btn btn-danger">Delete</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}