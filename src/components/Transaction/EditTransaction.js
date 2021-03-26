import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';

function EditTransaction(props) {

    return (
        <div className="App">
            <Form transaction = {props.transaction}/>
        </div>
    )
}

export default EditTransaction


function Form(props) {
    const history = useHistory()
    const [Poc, setPoc] = useState('')
    const [Donor, setDonor] = useState('')
    const [Amount, setAmount] = useState('')
    const [Currency, setCurrency] = useState('')
    const [Date, setDate] = useState('')
    console.log(props.transaction)

    // const history = useHistory()

    useEffect(() => {
        setPoc(props.transaction.Poc)
        setDonor(props.transaction.Donor)
        setAmount(props.transaction.Amount)
        setCurrency(props.transaction.Currency)
        setDate(props.transaction.Date)
    }, [props.transaction])

    const updateTransaction = () => {
        APIService.UpdateTransaction(props.transaction.id, {
            Poc,
            Donor,
            Amount,
            Currency,
            Date
        })
        alert("Transaction Entry Updated");
        history.push('/');
    }

    const deleteBtn = () => {
        var transaction_check = prompt("Please enter the POC of the Donor:", props.transaction.Poc);
        if (transaction_check == null || transaction_check !=props.transaction.Poc || transaction_check == "") {
            alert("Try Again, Transaction Name miss match")
        } 
        else {
            APIService.DeleteTransaction(props.transaction.id)
            .catch(error => console.log(error))
            alert("Transaction Entry Deleted");
            history.push('/');
        }
        }

    return (
        <div className="mb-3">
            <label htmlFor='Poc' className='form-label'>Poc</label>
            <input type="text" className='form-control' id='Poc' placeholder = "Please Enter the Poc"
            value={Poc} onChange={e => setPoc(e.target.value)}/>


            <label htmlFor='Donor' className='form-label'>Donor</label>
            <input type="text" className='form-control' id='Donor' placeholder = "Please Enter the Donor"
            value={Donor} onChange={e => setDonor(e.target.value)}/>


            <label htmlFor='Amount' className='form-label'>Amount</label>
            <input type="text" className='form-control' id='Amount' placeholder = "Please Enter the Amount"
            value={Amount} onChange={e => setAmount(e.target.value)}/>


            <label htmlFor='Currency' className='form-label'>Currency</label>
            <input type="text" className='form-control' id='Currency' placeholder = "Please Enter the Currency"
            value={Currency} onChange={e => setCurrency(e.target.value)}/>


            <label htmlFor='Date' className='form-label'>Date</label>
            <input type="text" className='form-control' id='Date' placeholder = "Please Enter the Date"
            value={Date} onChange={e => setDate(e.target.value)}/>

            <br/>

            <div className = "row">   
                <button onClick={updateTransaction} className="btn btn-success">Update Transaction</button>
            <div className = "col">
                <br/>
            </div>
                <button onClick = {deleteBtn} className = "btn btn-danger">Delete</button>
          </div>
        </div>
    )
}