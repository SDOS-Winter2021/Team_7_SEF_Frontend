import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';

function AddDonor() {

    return (
        <div className="App">
            <Form/>
        </div>
    )
}

export default AddDonor


function Form() {
    const history = useHistory()
    const [Title, setTitle] = useState('')
    const [Family_Name, setFamily_Name] = useState('')
    const [First_Name, setFirst_Name] = useState('')
    const [Current_Address, setCurrent_Address] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Birth_Date, setBirth_Date] = useState('')
    const [First_Donation_Date, setFirst_Donation_Date] = useState('')
    const [Recruitment_Source, setRecruitment_Source] = useState('')
    const [Recruitment_Reason, setRecruitment_Reason] = useState('')
    const [Number_of_Donations, setNumber_of_Donations] = useState('')
    const [Cumulative_Donation_Amount, setCumulative_Donation_Amount] = useState('')
    const [Last_Donation_Amount, setLast_Donation_Amount] = useState('')
    const [Date_of_Last_Donation, setDate_of_Last_Donation] = useState('')
    const [Preferred_Communication, setPreferred_Communication] = useState('')
    const [Date_of_Last_Communication, setDate_of_Last_Communication] = useState('')
    const [Last_communication, setLast_communication] = useState('')
    const [SEF_POC, setSEF_POC] = useState('')
    const [Notes, setNotes] = useState('')
    const [Email_Communication_Rate, setEmail_Communication_Rate] = useState('')
    // const history = useHistory()

    useEffect(() => {
        setTitle('')
        setFamily_Name('')
        setFirst_Name('')
        setCurrent_Address('')
        setEmail('')
        setPhone('')
        setBirth_Date('')
        setFirst_Donation_Date('')
        setRecruitment_Source('')
        setRecruitment_Reason('')
        setNumber_of_Donations('')
        setCumulative_Donation_Amount('')
        setLast_Donation_Amount('')
        setDate_of_Last_Donation('')
        setPreferred_Communication('')
        setDate_of_Last_Communication('')
        setLast_communication('')
        setSEF_POC('')
        setNotes('')
        setEmail_Communication_Rate('')
    }, [])

    const addDonor = () => {
        if (check(Title) && check(Family_Name) && check(First_Name) && check(Current_Address) && check(Email) && check(Phone) && check(Birth_Date) && check(First_Donation_Date) && check(Recruitment_Source) && check(Recruitment_Reason) && check(Number_of_Donations) && check(Cumulative_Donation_Amount) && check(Last_Donation_Amount) && check(Date_of_Last_Donation) && check(Last_communication) && check(SEF_POC) && check(Notes) && check(Email_Communication_Rate)) {
            APIService.AddDonor({
                Title,
                Family_Name,
                First_Name,
                Current_Address,
                Email,
                Phone,
                Birth_Date,
                First_Donation_Date,
                Recruitment_Source,
                Recruitment_Reason,
                Number_of_Donations,
                Cumulative_Donation_Amount,
                Last_Donation_Amount,
                Date_of_Last_Donation,
                Preferred_Communication,
                Date_of_Last_Communication,
                Last_communication,
                SEF_POC,
                Notes,
                Email_Communication_Rate
            })
            alert("New Donor Added");
            history.push('/');
        }
        else{
            alert("Error in Input")
        }
        
    }

    return (
        <div className="mb-3">
            <label htmlFor='Title' className='form-label'>Title</label>
            <input type="text" className='form-control' id='Title' placeholder = "Please Enter the Title"
            value={Title} onChange={e => setTitle(e.target.value)}/>


            <label htmlFor='Family_Name' className='form-label'>Family Name</label>
            <input type="text" className='form-control' id='Family_Name' placeholder = "Please Enter the Family Name"
            value={Family_Name} onChange={e => setFamily_Name(e.target.value)}/>


            <label htmlFor='First_Name' className='form-label'>First Name</label>
            <input type="text" className='form-control' id='First_Name' placeholder = "Please Enter the First Name"
            value={First_Name} onChange={e => setFirst_Name(e.target.value)}/>


            <label htmlFor='Current_Address' className='form-label'>Current Address</label>
            <input type="text" className='form-control' id='Current_Address' placeholder = "Please Enter the Current Address"
            value={Current_Address} onChange={e => setCurrent_Address(e.target.value)}/>


            <label htmlFor='Email' className='form-label'>Email</label>
            <input type="text" className='form-control' id='Email' placeholder = "Please Enter the Email"
            value={Email} onChange={e => setEmail(e.target.value)}/>


            <label htmlFor='Phone' className='form-label'>Phone</label>
            <input type="text" className='form-control' id='Phone' placeholder = "Please Enter the Phone"
            value={Phone} onChange={e => setPhone(e.target.value)}/>


            <label htmlFor='Birth_Date' className='form-label'>Birth Date</label>
            <input type="text" className='form-control' id='Birth_Date' placeholder = "Please Enter the Birth Date"
            value={Birth_Date} onChange={e => setBirth_Date(e.target.value)}/>


            <label htmlFor='First_Donation_Date' className='form-label'>First Donation Date</label>
            <input type="text" className='form-control' id='First_Donation_Date' placeholder = "Please Enter the First Donation Date"
            value={First_Donation_Date} onChange={e => setFirst_Donation_Date(e.target.value)}/>


            <label htmlFor='Recruitment_Source' className='form-label'>Recruitment Source</label>
            <input type="text" className='form-control' id='Recruitment_Source' placeholder = "Please Enter the Recruitment Source"
            value={Recruitment_Source} onChange={e => setRecruitment_Source(e.target.value)}/>


            <label htmlFor='Recruitment_Reason' className='form-label'>Recruitment Reason</label>
            <input type="text" className='form-control' id='Recruitment_Reason' placeholder = "Please Enter the Recruitment Reason"
            value={Recruitment_Reason} onChange={e => setRecruitment_Reason(e.target.value)}/>


            <label htmlFor='Number_of_Donations' className='form-label'>Number of Donations</label>
            <input type="text" className='form-control' id='Number_of_Donations' placeholder = "Please Enter the Number of Donations"
            value={Number_of_Donations} onChange={e => setNumber_of_Donations(e.target.value)}/>


            <label htmlFor='Cumulative_Donation_Amount' className='form-label'>Cumulative Donation Amount</label>
            <input type="text" className='form-control' id='Cumulative_Donation_Amount' placeholder = "Please Enter the Cumulative Donation Amount"
            value={Cumulative_Donation_Amount} onChange={e => setCumulative_Donation_Amount(e.target.value)}/>


            <label htmlFor='Last_Donation_Amount' className='form-label'>Last Donation Amount</label>
            <input type="text" className='form-control' id='Last_Donation_Amount' placeholder = "Please Enter the Last Donation Amount"
            value={Last_Donation_Amount} onChange={e => setLast_Donation_Amount(e.target.value)}/>


            <label htmlFor='Date_of_Last_Donation' className='form-label'>Date of Last Donation</label>
            <input type="text" className='form-control' id='Date_of_Last_Donation' placeholder = "Please Enter the Date of Last Donation"
            value={Date_of_Last_Donation} onChange={e => setDate_of_Last_Donation(e.target.value)}/>


            <label htmlFor='Preferred_Communication' className='form-label'>Preferred Communication</label>
            <input type="text" className='form-control' id='Preferred_Communication' placeholder = "Please Enter the Preferred Communication"
            value={Preferred_Communication} onChange={e => setPreferred_Communication(e.target.value)}/>


            <label htmlFor='Date_of_Last_Communication' className='form-label'>Date of Last Communication</label>
            <input type="text" className='form-control' id='Date_of_Last_Communication' placeholder = "Please Enter the Date of Last Communication"
            value={Date_of_Last_Communication} onChange={e => setDate_of_Last_Communication(e.target.value)}/>


            <label htmlFor='Last_communication' className='form-label'>Last communication</label>
            <input type="text" className='form-control' id='Last_communication' placeholder = "Please Enter the Last communication"
            value={Last_communication} onChange={e => setLast_communication(e.target.value)}/>


            <label htmlFor='SEF_POC' className='form-label'>SEF POC</label>
            <input type="text" className='form-control' id='SEF_POC' placeholder = "Please Enter the SEF POC"
            value={SEF_POC} onChange={e => setSEF_POC(e.target.value)}/>


            <label htmlFor='Notes' className='form-label'>Notes</label>
            <input type="text" className='form-control' id='Notes' placeholder = "Please Enter the Notes"
            value={Notes} onChange={e => setNotes(e.target.value)}/>


            <label htmlFor='Email_Communication_Rate' className='form-label'>Email Communication Rate</label>
            <input type="text" className='form-control' id='Email_Communication_Rate' placeholder = "Please Enter the Email Communication Rate"
            value={Email_Communication_Rate} onChange={e => setEmail_Communication_Rate(e.target.value)}/>

            <br/>
            <button onClick={addDonor} className="btn btn-success">Add Donor</button>
        </div>
    )
}

function check(data){
    if (data == null){
        console.log(data)
        return true;
    }
    return false;
}