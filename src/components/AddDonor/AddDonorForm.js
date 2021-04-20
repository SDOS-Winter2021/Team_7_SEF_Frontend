import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Button, Col, Row, Container, Breadcrumb } from 'react-bootstrap';

function AddDonorForm() {

    return (
        <div className="App">
            <Formx />
        </div>
    )
}

export default AddDonorForm


function Formx() {
    const history = useHistory()
    const [PAN, setPAN] = useState('')
    const [Title, setTitle] = useState('')
    const [First_Name, setFirst_Name] = useState('')
    const [Last_Name, setLast_Name] = useState('')
    const [Current_Address, setCurrent_Address] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Birth_Date, setBirth_Date] = useState(null)
    const [Recruitment_Source, setRecruitment_Source] = useState('')
    const [Recruitment_Type, setRecruitment_Type] = useState('')
    const [Nationality, setNationality] = useState('')
    const [Organisation, setOrganisation] = useState('')
    const [Status, setStatus] = useState('')

    useEffect(() => {
        setPAN('')
        setTitle('')
        setFirst_Name('')
        setLast_Name('')
        setCurrent_Address('')
        setEmail('')
        setPhone('')
        setBirth_Date(null)
        setRecruitment_Source('')
        setRecruitment_Type('')
        setNationality('')
        setOrganisation('')
        setStatus('')
    }, [])

    const yourChangeHandler = (event) => {
        setNationality(event.target.value)
    }

    const yourChangeHandler2 = (event) => {
        setTitle(event.target.value)
    }

    const [validated, setValidated] = useState(false);

    const addDonor = (event) => {
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            APIService.AddDonor({
                PAN,
                Title,
                First_Name,
                Last_Name,
                Current_Address,
                Email,
                Phone,
                Birth_Date,
                Recruitment_Source,
                Recruitment_Type,
                Nationality,
                Organisation,
                Status
            })
                .then(resp => {
                    if (check(resp)) {
                        alert("New Donor Added");
                        history.push('/donor');
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
                    <br />
                </div>
                <div className="col">
                    <br />
                </div>
                <div className="col">
                    <br />
                </div>
                <div className="col">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/donor">Donor</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add Donor</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <br />
            <Container > {/*change the widht of the form (padding) */}
                <Form noValidate validated={validated}>

                    <Form.Group as={Row} controlId="validationTitle">
                        <Form.Label column sm={2}>Title <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                required
                                as='select'
                                type="text"
                                placeholder="Title"
                                value={Title}
                                onChange={yourChangeHandler2.bind(this)}>
                                <option>Choose</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Miss</option>
                                <option>Ms</option>
                                <option>Mx</option>
                                <option>Dr</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter the Title.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationFirst_Name">
                        <Form.Label column sm={2}>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First Name"
                                value={First_Name}
                                onChange={e => setFirst_Name(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter First Name.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />


                    <Form.Group as={Row} controlId="validationLast_Name">
                        <Form.Label column sm={2}>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last Name"
                                value={Last_Name}
                                onChange={e => setLast_Name(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter Last Name.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationEmail">
                        <Form.Label column sm={2}>Email <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                value={Email}
                                onChange={e => setEmail(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Email.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationPhone">
                        <Form.Label column sm={2}>Phone</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                value={Phone}
                                onChange={e => setPhone(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Phone.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationBirth_Date">
                        <Form.Label column sm={2}>Birth Date</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="date"
                                placeholder="Birth Date"
                                value={Birth_Date}
                                onChange={e => setBirth_Date(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Birth Date.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationAddress">
                        <Form.Label column sm={2}>Current Address</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as='textarea'
                                type="text"
                                row={5}
                                placeholder="Current Address"
                                value={Current_Address}
                                onChange={e => setCurrent_Address(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Address.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />


                    <Form.Group as={Row} controlId="validationPAN">
                        <Form.Label column sm={2}>PAN</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="PAN"
                                value={PAN.toUpperCase()}
                                onChange={e => setPAN(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the PAN.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationRecruitment_Source">
                        <Form.Label column sm={2}>Recruitment Source</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Recruitment Source"
                                value={Recruitment_Source}
                                onChange={e => setRecruitment_Source(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Recruitment Source.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationRecruitment_Type">
                        <Form.Label column sm={2}>Recruitment Type</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Recruitment Type"
                                value={Recruitment_Type}
                                onChange={e => setRecruitment_Type(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Recruitment Type.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationNationality">
                        <Form.Label column sm={2}>Nationality <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                required
                                as='select'
                                type="text"
                                placeholder="Nationality"
                                value={Nationality}
                                onChange={yourChangeHandler.bind(this)}>
                                <option value="">Choose</option>
                                <option value="Indian">Indian</option>
                                <option value="FCRA">FCRA</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter the Nationality.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationOrganisation">
                        <Form.Label column sm={2}>Organisation</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Organisation"
                                value={Organisation}
                                onChange={e => setOrganisation(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Organisation.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Form.Group as={Row} controlId="validationStatus"> {/*need to convert into options on further review*/}
                        <Form.Label column sm={2}>Status <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Status"
                                value={Status}
                                onChange={e => setStatus(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">Please enter the Status.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <br />

                    <Row className="md-center">
                        <Col sm={4}>
                        </Col>
                        <Col sm={4}>
                            <Button block onClick={addDonor} className="btn btn-success">Add Donor</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

function check(resp) {
    console.log(resp)
    if (resp.id === undefined) {
        return false;
    }
    else {
        return true;
    }
}