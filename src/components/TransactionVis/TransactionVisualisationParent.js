import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Paper } from '@material-ui/core'
import { Col, Row, Container, Jumbotron } from 'react-bootstrap';
import TransactionVisualisation from './TransactionVisualisation'


function TransactionVisualisationParent() {

  const getItems = () => APIService.GetTransaction();
  const [transactions, setTransactions] = useState([]);
  const [totalDonations, setTotalDonations] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    getItems().then(data => setTransactions(data));
  }, []);

  useEffect(() => {
    var c = 0
    var a = 0
    transactions.forEach(d => {
        c=c+1;
        a=a+d.Amount;
    });
    setTotalDonations(c)
    setTotalAmount(a)
  }, [transactions])


  return (
    <div>
      <Container>
        <Jumbotron style={{ "background": "rgb(249,249,249)" }}>

            <Row>
                <Col sm={12}>
                    <h3 class='display-text'> Transaction Stats </h3>
                    <hr></hr>
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    <br></br>
                </Col>
            </Row>


            <Row>
                <Col sm={4}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div>
                            <span align='center'>
                                <h3>{totalDonations}</h3>
                            </span>
                        </div>
                        <div align='center'>
                            Total Donations
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={4}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div>
                            <span align='center'>
                                <h3>Rs. {totalAmount}</h3>
                            </span>
                        </div>
                        <div align='center'>               
                            Raised in this Quarter   
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={4}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div>
                            <span align='center'>
                                <h3>--</h3>
                            </span>
                        </div>
                        <div align='center'>               
                            vs. previous Quarter   
                        </div>
                        <br/>
                    </Paper>
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    <br/>
                    <h4 className='display-text'> Amount Raised per Quarter <h6>(in thousands)</h6> </h4> 
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <div align='center'>
                        <TransactionVisualisation amountQ1={totalAmount}/>
                    </div>
                </Col>
            </Row>
        </Jumbotron>
      </Container>
      
    </div>
  )
}

export default TransactionVisualisationParent
