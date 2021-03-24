import React,{useState,useEffect} from 'react'
import DonorList from '../DonorList';
import DonorList2 from '../DonorList2';
import { useHistory } from 'react-router-dom';

function WithUser() {

    const fetchURL = 'http://127.0.0.1:8000/api/donor/';
    const getItems = () => fetch(fetchURL).then(res => res.json());
    const [donors, setDonors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getItems().then(data => setDonors(data));
      }, []);

    const editBtn = (donor) => {
      localStorage.setItem('curr_donor',JSON.stringify(donor))
      history.push('/donor');
    }
    
    const donorForm = () => {
      localStorage.setItem('curr_donor',null)
      history.push('/donor');
    }

    const topFunction = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      console.log('top button clicked')
    }

    const scrollFunction = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    var mybutton = document.getElementById("myBtn");
    window.onscroll = function() {scrollFunction()};

    return (
        <div className="App">
          <div className = "row">
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">
              <button onClick = {donorForm} className = "btn btn-primary">Add Donor</button>
            </div>
          </div>
          <div className = "row">
            <br/>
          </div>
            <DonorList2 donors = {donors} editBtn = {editBtn}/>
          <div>
            <button onClick={topFunction} id="myBtn">Top</button>
          </div>
        </div>
    )
}

export default WithUser