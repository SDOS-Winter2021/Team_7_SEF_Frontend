import React, { useState, useEffect } from 'react'
import EPList from './EPList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Form, Col, Row, Container, Breadcrumb, Jumbotron } from 'react-bootstrap';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

function EPUser(props) {

  const getItems = () => APIService.GetEP();
  const [donor, setDonor] = useState('')
  const [ep, setEP] = useState([])
  const [filterEP, setFilterEPs] = useState([])
  const history = useHistory();

  useEffect(() => {
    setDonor(props.donor)
    getItems().then(data => setEP(data));
  }, [props])

  useEffect(() => {
    var tx = []
    ep.forEach(engagement => {
      if (engagement?.Donor === donor?.id) {
        tx.push(engagement);
      }
    });
    setFilterEPs(tx)
  }, [ep, donor])

  const editDonor = () => {
    localStorage.setItem('curr_donor', JSON.stringify(donor))
    history.push('/donor/donorEP/editDonor');
  }

  const taskDoneBtn = () => {
    alert("Task Done")
    window.location.reload(true);
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <Breadcrumb style={{width:400}}>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/donor">Donor</Breadcrumb.Item>
            <Breadcrumb.Item active>Donor Engagement Plan</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="col">
        </div>
        <div className="col">
        </div>
        <div className="col">
        </div>
        <div className="col">
          <button onClick={editDonor} className="btn btn-warning">Edit Donor Details</button>
        </div>
      </div>
      <div className="row">
        <br />
      </div>
      <DonorDetails donor={donor} />
      <EPList EP={filterEP} taskDoneBtn={taskDoneBtn}/>
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
    
    
    <Jumbotron fluid style={{background:'rgb(249,249,249)'}}>
    <span class='display-text'>
      <Container>
      <Row style={{paddingBottom:12, paddingTop:0}}>
        <Col>
          <Form.Label><b>Name:</b> {Title} {First_Name} {Last_Name}</Form.Label>
        </Col>
        <Col>
          <Form.Label><b>PAN:</b> {PAN}</Form.Label>
        </Col>
        <Col>
          <Form.Label><b>Email:</b> {Email}</Form.Label>
        </Col>
      </Row>
      <Row style={{paddingBottom:12}}>
        <Col>
          <Form.Label><b>Nationality:</b> {Nationality}</Form.Label>
        </Col>
        <Col>
          <Form.Label><b>Recruitment Source:</b> {Recruitment_Source}</Form.Label>
        </Col>
        <Col>
          <Form.Label><b>Recruitment Type:</b> {Recruitment_Type}</Form.Label>
        </Col>
      </Row>
      <Row style={{paddingBottom:0}}>
        <Col>
          <Form.Label><b>Status:</b> {Status}</Form.Label>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      </Container>
      </span>
    </Jumbotron>
      
  )

}
