import React, { useState, useEffect } from 'react'
import TransactionList from './TransactionList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

function WithUserTransaction() {

  const getItems = () => APIService.GetTransaction();
  const [transactions, setTransactions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getItems().then(data => setTransactions(data));
  }, []);

  const editBtn = (transaction) => {
    localStorage.setItem('curr_transaction', JSON.stringify(transaction))
    history.push('/transaction/editTransaction');
  }

  const approveBtn = () => {
    alert("Transaction Approved")
    window.location.reload(true);
  }

  const transactionForm = () => {
    localStorage.setItem('curr_transaction', null)
    history.push('/transaction/addTransaction');
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Transaction</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="col">
          <br />
        </div>
        <div className="col">
          <br />
        </div>
        <div className="col">
          <button onClick={transactionForm} className="btn btn-primary">New Transaction</button>
        </div>
      </div>
      <div className="row">
        <br />
      </div>
      <TransactionList transactions={transactions} editBtn={editBtn} approveBtn={approveBtn} />
      <div>
        <ScrollUpButton />
      </div>
    </div>
  )
}

export default WithUserTransaction
