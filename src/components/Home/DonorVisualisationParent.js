import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import { Paper } from '@material-ui/core'
import { Button, Col, Row, Container, Jumbotron } from 'react-bootstrap';
import DonorVisualisation from './DonorVisualisation'


function DonorVisualisationParent() {

  const getItems = () => APIService.GetDonor();
  const [donors, setDonors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getItems().then(data => setDonors(data));
  }, []);

  return (
    <div>
      <Container>
        <Jumbotron style={{ "background": "rgb(249,249,249)" }}>

            {/* <Row>
                <Col sm={12}>
                    <br/>
                    <h3 class='display-text'> Donor Stats </h3>
                    <hr/>
                </Col>
            </Row> */}

            {/* <Row>
                <Col sm={12}>
                    <br></br>
                </Col>
            </Row> */}


            <Row>
                <Col sm={2}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div align='center' class='display-text'>
                            Total Donors
                        </div>
                        <br/>
                        <div>
                            <span class='display-text' STYLE="font-weight:bold" align='center'>
                                <h4>Value</h4>
                            </span>
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={2}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div align='center' class='display-text'>
                            Total Donors
                        </div>
                        <br/>
                        <div>
                            <span class='display-text' STYLE="font-weight:bold" align='center'>
                                <h5>Value</h5>
                            </span>
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={2}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div align='center' class='display-text'>
                            Total Donors
                        </div>
                        <br/>
                        <div>
                            <span class='display-text' STYLE="font-weight:bold" align='center'>
                                <h5>Value</h5>
                            </span>
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={2}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div align='center' class='display-text'>
                            Total Donors
                        </div>
                        <br/>
                        <div>
                            <span class='display-text' STYLE="font-weight:bold" align='center'>
                                <h5>Value</h5>
                            </span>
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={2}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div align='center' class='display-text'>
                            Total Donors
                        </div>
                        <br/>
                        <div>
                            <span class='display-text' STYLE="font-weight:bold" align='center'>
                                <h5>Value</h5>
                            </span>
                        </div>
                        <br/>
                    </Paper>
                </Col>
                <Col sm={2}>
                    <Paper elevation={0} variant='outlined'> 
                        <br/>
                        <div align='center' class='display-text'>
                            Total Donors
                        </div>
                        <br/>
                        <div>
                            <span class='display-text' STYLE="font-weight:bold" align='center'>
                                <h5>Value</h5>
                            </span>
                        </div>
                        <br/>
                    </Paper>
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    <br/>
                    <h3 class='display-text'> Donor Stats </h3>
                    <hr/>
                </Col>
            </Row>

            {/* <Row>
                <Col sm={12}>
                    <br></br>
                </Col>
            </Row> */}

            <Row>
                <Col>
                    <DonorVisualisation/>
                </Col>
            </Row>
        </Jumbotron>
      </Container>
      
    </div>
  )
}

export default DonorVisualisationParent
