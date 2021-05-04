import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Button, Col, Row, Container, Breadcrumb, Jumbotron } from 'react-bootstrap';

function AddNoteForm(props) {

    return (
        <div className="App">
            <Formx donor={props.donor} />
        </div>
    )
}

export default AddNoteForm


function Formx(props) {
    const history = useHistory()
    const [Donor, setDonor] = useState([])
    const [Date, setDate] = useState('')
    const [Notes, setNotes] = useState('')

    useEffect(() => {
        setDonor(props.donor.id)
        setDate('')
        setNotes('')
    }, [props])

    const [validated, setValidated] = useState(false);

    const addNote = (event) => {
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            APIService.AddNote({
                Donor,
                Notes,
                Date
            })
                .then(resp => {
                    if (check(resp)) {
                        alert("New Note Added");
                        history.push('/donor/notes');
                    }
                }
                )
        }
        setValidated(true);
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/donor">Donor</Breadcrumb.Item>
                        <Breadcrumb.Item href="/donor/notes">Notes</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add Note</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="col">
                </div>
                <div className="col">
                </div>
            </div>
            <br />

            <span className='display-text'>
            <Container > {/*change the widht of the form (padding) */}
                <Jumbotron style={{ "background": "rgb(249,249,249)" }}>
                    <Form noValidate validated={validated}>

                    <Row><h4>Add Note</h4></Row>
                    <hr/>
                    <br/>

                        <Form.Group as={Row} controlId="validationNote">
                            <Form.Label column sm={2}>Note</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as='textarea'
                                    type="text"
                                    row={10}
                                    placeholder="Note"
                                    value={Notes}
                                    onChange={e => setNotes(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">Please enter the Note.</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <br />

                        <Form.Group as={Row} controlId="validationDate">
                            <Form.Label column sm={2}>Date <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Col sm={3}>
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
                        <br/>
                        <br/>

                        <Row className="md-center">
                            <Col sm={2}></Col>
                            <Col sm={4}>
                                <Button block href='/Donor/Notes' className="btn btn-danger">Cancel</Button>
                            </Col>
                            <Col sm={4}>
                                <Button block onClick={addNote} className="btn btn-success">Add Note</Button>
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