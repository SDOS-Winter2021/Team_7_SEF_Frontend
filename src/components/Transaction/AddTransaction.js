import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';

function AddTransaction() {

    return (
        <div className="App">
            <Form/>
        </div>
    )
}

export default AddTransaction


function Form() {
    const history = useHistory()
    const [Poc, setPoc] = useState('')
    const [Donor, setDonor] = useState('')
    const [Amount, setAmount] = useState('')
    const [Currency, setCurrency] = useState('')
    const [Date, setDate] = useState('')
    // const history = useHistory()

    useEffect(() => {
        setPoc('')
        setDonor('')
        setAmount('')
        setCurrency('')
        setDate('')
    }, [])

    const addTransaction = () => {
        APIService.AddTransaction({
            Poc,
            Donor,
            Amount,
            Currency,
            Date
        })
        .then(resp => {
            if (check(resp)) {
                alert("New Transaction Added")
                history.push('/')
            }
            else{
                alert("Error in Input")
            }
        }
        )
        
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
            <button onClick={addTransaction} className="btn btn-success">Add Transaction</button>
        </div>
    )
}

function check(resp){
    if (resp.Date == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD." || resp.Amount == "A valid integer is required." || resp.Poc == "This field may not be blank." || resp.Donor == "This field may not be blank." || resp.Currency == "This field may not be blank.") {
        return false;
    }
    return true;
}