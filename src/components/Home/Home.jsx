import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WithoutUser from '../WithoutUser'
import APIService from '../../APIService';
import { useHistory } from 'react-router-dom'
import { Button, Col, Row, Container } from 'react-bootstrap';
import DonorVisualisationParent from '../DonorVis/DonorVisualisationParent'
import TransactionVisualisationParent from '../TransactionVis/TransactionVisualisationParent'
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

export const Home = () => {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [email, setEmail] = useState('')
  useEffect(() => {
    setEmail(user?.result.email)

  }, [location, user])

  if (user === null) {
    return (
      <div className="App">
        <WithoutUser />
      </div>
    )
  }

  else {
    return (
      <div className="App">
        <UserCheck email={email} />
      </div>
    )
  }
}

const UserCheck = (props) => {
  const [staff, setStaff] = useState([])
  const getItems = () => APIService.GetStaff();

  useEffect(() => {
    getItems().then(data => data.forEach(data_item => {
      if (props.email === data_item.Email) {
        setStaff(data_item)
        localStorage.setItem('Team', JSON.stringify(data_item.Team))
      }
    }))
  }, [props])

  if (staff.Team === 'Donor') {
    return (
      <div className="App">
        <Donor />
      </div>
    )
  }

  else if (staff.Team === 'Finance') {
    return (
      <div className="App">
        <Finance />
      </div>
    )
  }

  else if (staff.Team === 'CnF') {
    return (
      <div className="App">
        <CnF />
      </div>
    )
  }

  else {
    return (
      <div className="App">
        <WithoutUser />
      </div>
    )
  }

}

function Donor() {
  const history = useHistory()
  const Btn1 = () => {
    history.push('/donor');
  }
  const Btn2 = () => {
    history.push('/mailchimpAnalytics');
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Button block onClick={Btn1}>Donors</Button>
          </Col>
          <Col>
            <Button block onClick={Btn2}>MailChimp Analytics</Button>
          </Col>
        </Row>
      </Container>
      {/* <button onClick={Btn}>Donors</button> */}
    </div>
  )
}

function Finance() {
  const history = useHistory()
  const Btn = () => {
    history.push('/transaction');
  }

  return (
    <div className="App">
      <Container>
        <Button block onClick={Btn}>Transactions</Button>
      </Container>
    </div>
  )
}

function CnF() {
  const history = useHistory()
  const Btn1 = () => {
    history.push('/donor');
  }
  const Btn2 = () => {
    history.push('/transaction');
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Button block onClick={Btn1}>Donors</Button>
          </Col>
          <Col>
            <Button block onClick={Btn2}>Transactions</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <br/>
            <br/>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
          
              <DonorVisualisationParent/>
            
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
          
              <TransactionVisualisationParent/>
            
          </Col>
        </Row>
        
      </Container>
      <div>
        <ScrollUpButton />
      </div>
    </div>
  )
}