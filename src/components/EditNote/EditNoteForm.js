import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Button, Col, Row, Container, Breadcrumb, Jumbotron } from 'react-bootstrap';

function EditNoteForm(props) {

    return (
        <div className="App">
            <Formx donor={props.donor} note={props.note} />
        </div>
    )
}

export default EditNoteForm


function Formx(props) {
    const history = useHistory()
    const [Donor, setDonor] = useState([])
    const [Date, setDate] = useState('')
    const [Notes, setNotes] = useState('')

    useEffect(() => {
        setDonor(props.donor.id)
        setDate(props.note.Date)
        setNotes(props.note.Notes)
    }, [props])

    const [validated, setValidated] = useState(false);

    const updateNote = (event) => {
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            APIService.UpdateNote(props.note.id, {
                Donor,
                Notes,
                Date
            })
            alert("Note Entry Updated");
            history.push('/donor/notes');
        }
        setValidated(true);
    }

    const deleteBtn = () => {
        APIService.DeleteDonor(props.note.id)
            .catch(error => console.log(error))
        alert("Note Entry Deleted");
        history.push('/donor/notes');
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/donor">Donor</Breadcrumb.Item>
                        <Breadcrumb.Item href="/donor/notes">Notes</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit Note</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="col">
                </div>
                <div className="col">
                </div>
                <div className="col">
                </div>
            </div>
            <br />
            <br />
            <Container > {/*change the widht of the form (padding) */}
                <Jumbotron style={{ "background": "rgb(52, 58, 64)" }}>
                    <Form noValidate validated={validated}>

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

                        <Row>
                            <Col sm={2}>
                            </Col>
                            <Col sm={4}>
                                <Button block onClick={updateNote} className="btn btn-success">Update Note</Button>
                            </Col>
                            <Col sm={1}>
                            </Col>
                            <Col sm={4}>
                                <Button block onClick={deleteBtn} className="btn btn-danger">Delete Note</Button>
                            </Col>
                        </Row>
                    </Form>
                </Jumbotron>
            </Container>
        </div>
    )
}