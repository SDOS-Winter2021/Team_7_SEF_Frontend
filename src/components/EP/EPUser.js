import React, { useState, useEffect } from 'react'
import EPList from './EPList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Col, Row, Container, Breadcrumb } from 'react-bootstrap';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

function EPUser(props) {

  const getItems = () => APIService.GetTransaction();
  const [donor, setDonor] = useState('')
  const [transaction, setTransactions] = useState([])
  const [filterTransaction, setFilterTransactions] = useState([])
  const history = useHistory();

  useEffect(() => {
    setDonor(props.donor)
    getItems().then(data => setTransactions(data));
  }, [props])

  useEffect(() => {
    var tx = []
    transaction.forEach(tran => {
      if (tran?.Donor === donor?.id) {
        tx.push(tran.Date);
      }
    });
    setFilterTransactions(tx)
  }, [transaction, donor])

  const noteForm = () => {
    localStorage.setItem('curr_donor', JSON.stringify(donor))
    history.push('/donor/donorEP/editDonor');
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <button onClick={noteForm} className="btn btn-primary">Edit Donor Details</button>
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
            <Breadcrumb.Item active>Donor Engagement Plan</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="row">
        <br />
      </div>
      <DonorDetails donor={donor} />
      <div>
      </div>
      <EPList donor={donor} transactions={filterTransaction} />
      <div>
        <ScrollUpButton />
      </div>
    </div>
  )
}

export default EPUser

function DonorDetails(props) {
  const [PAN, setPAN] = useState('')
  const [Title, setTitle] = useState('')
  const [First_Name, setFirst_Name] = useState('')
  const [Last_Name, setLast_Name] = useState('')
  const [Email, setEmail] = useState('')
  const [Recruitment_Source, setRecruitment_Source] = useState('')
  const [Recruitment_Type, setRecruitment_Type] = useState('')
  const [Nationality, setNationality] = useState('')
  const [Status, setStatus] = useState('')

  useEffect(() => {
    setPAN(props.donor.PAN)
    setTitle(props.donor.Title)
    setFirst_Name(props.donor.First_Name)
    setLast_Name(props.donor.Last_Name)
    setEmail(props.donor.Email)
    setRecruitment_Source(props.donor.Recruitment_Source)
    setRecruitment_Type(props.donor.Recruitment_Type)
    setNationality(props.donor.Nationality)
    setStatus(props.donor.Status)
  }, [props.donor])

  return (
    <Container >
      <Row>
        <Col>
          <Form.Label>Name: {Title} {First_Name} {Last_Name}</Form.Label>
        </Col>
        <Col>
          <Form.Label>PAN: {PAN}</Form.Label>
        </Col>
        <Col>
          <Form.Label>Email: {Email}</Form.Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Nationality: {Nationality}</Form.Label>
        </Col>
        <Col>
          <Form.Label>Recruitment Source: {Recruitment_Source}</Form.Label>
        </Col>
        <Col>
          <Form.Label>Recruitment Type: {Recruitment_Type}</Form.Label>
        </Col>
      </Row>
      <Col>
        <Form.Label>Status: {Status}</Form.Label>
      </Col>
    </Container>
  )

}