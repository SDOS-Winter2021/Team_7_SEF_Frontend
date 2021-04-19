import React,{useState,useEffect} from 'react'
import DonorList from './DonorList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function WithUser() {

    const getItems = () => APIService.GetDonor();
    const [donors, setDonors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getItems().then(data => setDonors(data));
      }, []);

    const editBtn = (donor) => {
      localStorage.setItem('curr_donor',JSON.stringify(donor))
      history.push('/donor/donorEP/editDonor');
    }
    
    const donorForm = () => {
      localStorage.setItem('curr_donor',null)
      history.push('/donor/addDonor');
    }

    const topFunction = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      console.log('top button clicked')
    }

    return (
        <div className="App">
          <div className = "row">
            <div className = "col">
              <button onClick = {donorForm} className = "btn btn-primary">Add Donor</button>
            </div>
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">        
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Donor</Breadcrumb.Item>
            </Breadcrumb>
            </div>
          </div>
          <div className = "row">
            <br/>
          </div>
            <DonorList donors = {donors} editBtn = {editBtn}/>
          <div>
            <button onClick={topFunction} id="myBtn">Top</button>
          </div>
        </div>
    )
}

export default WithUser