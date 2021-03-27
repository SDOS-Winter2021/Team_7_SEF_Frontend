import React,{useState,useEffect} from 'react'
import TransactionList from '../TransactionList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';

function WithUserTransaction() {

    const getItems = () => APIService.GetTransaction();
    const [transactions, setTransactions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getItems().then(data => setTransactions(data));
      }, []);

    const editBtn = (transaction) => {
      localStorage.setItem('curr_transaction',JSON.stringify(transaction))
      history.push('/transaction');
    }

    const approveBtn = () => {
      alert("Transaction Approved")
      window.location.reload(true);
    }
    
    const transactionForm = () => {
      localStorage.setItem('curr_transaction',null)
      history.push('/transaction');
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
              <button onClick = {transactionForm} className = "btn btn-primary">New Transaction</button>
            </div>
          </div>
          <div className = "row">
            <br/>
          </div>
            <TransactionList transactions = {transactions} editBtn = {editBtn} approveBtn = {approveBtn}/>
          <div>
            <button onClick={topFunction} id="myBtn">Top</button>
          </div>
        </div>
    )
}

export default WithUserTransaction