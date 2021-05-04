import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Paper } from '@material-ui/core'
import { Col, Row, Container, Jumbotron } from 'react-bootstrap';
import DonorVisualisation from './DonorVisualisation'


function DonorVisualisationParent() {

  const getItems = () => APIService.GetDonor();
  const [donors, setDonors] = useState([]);
  const [totalDonors, setTotalDonors] = useState('');
  //const history = useHistory();

  useEffect(() => {
    getItems().then(data => setDonors(data));
  }, []);

  useEffect(() => {
    var c = 0
    donors.forEach(d => {
        c=c+1;
    });
    setTotalDonors(c)
  }, [donors])

  return (
    <div>
      <Container>
        <Jumbotron style={{ "background": "rgb(249,249,249)" }}>
            <Row>
                <Col sm={12}>
                    <h3 class='display-text'> Donor Stats </h3>
                    <hr/>
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
                                <h3>{totalDonors}</h3>
                            </span>
                        </div>
                        <div align='center'>
                            Total Donors
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={4}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div>
                            <span align='center'>
                                <h3>{totalDonors}</h3>
                            </span>
                        </div>
                        <div align='center'>               
                            New Donors added in this Quarter   
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
                    <h4 className='display-text'> New Donors Per Quarter </h4>
                    <br/>
                </Col>
            </Row>

            {/* <Row>
                <Col sm={12}>
                    <br></br>
                </Col>
            </Row> */}

            <Row>
                <Col>
                    <div align='center'>
                    <DonorVisualisation donorsQ1={totalDonors}/>
                    </div>
                </Col>
            </Row>
        </Jumbotron>
      </Container>
      
    </div>
  )
}

export default DonorVisualisationParent
