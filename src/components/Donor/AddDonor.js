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
    const [PAN, setPAN] = useState('')
    const [Title, setTitle] = useState('')
    const [First_Name, setFirst_Name] = useState('')
    const [Last_Name, setLast_Name] = useState('')
    const [Current_Address, setCurrent_Address] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Birth_Date, setBirth_Date] = useState('')
    const [Recruitment_Source, setRecruitment_Source] = useState('')
    const [Recruitment_Type, setRecruitment_Type] = useState('')
    const [Nationality, setNationality] = useState('')
    const [Organisation, setOrganisation] = useState('')
    const [Status, setStatus] = useState('')
    // const history = useHistory()

    useEffect(() => {
        setPAN('')
        setTitle('')
        setFirst_Name('')
        setLast_Name('')
        setCurrent_Address('')
        setEmail('')
        setPhone('')
        setBirth_Date('')
        setRecruitment_Source('')
        setRecruitment_Type('')
        setNationality('')
        setOrganisation('')
        setStatus('')
    }, [])

    const addDonor = () => {
        APIService.AddDonor({
            PAN,
            Title,
            First_Name,
            Last_Name,
            Current_Address,
            Email,
            Phone,
            Birth_Date,
            Recruitment_Source,
            Recruitment_Type,
            Nationality,
            Organisation,
            Status
        })
        .then(resp => {
            if (check(resp)) {
                alert("New Donor Added")
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
            <label htmlFor='PAN' className='form-label'>PAN</label>
            <input type="text" className='form-control' id='PAN' placeholder = "Please Enter the PAN"
            value={PAN} onChange={e => setPAN(e.target.value)}/>


            <label htmlFor='Title' className='form-label'>Title</label>
            <input type="text" className='form-control' id='Title' placeholder = "Please Enter the Title"
            value={Title} onChange={e => setTitle(e.target.value)}/>


            <label htmlFor='First_Name' className='form-label'>First Name</label>
            <input type="text" className='form-control' id='First_Name' placeholder = "Please Enter the First Name"
            value={First_Name} onChange={e => setFirst_Name(e.target.value)}/>


            <label htmlFor='Last_Name' className='form-label'>Last Name</label>
            <input type="text" className='form-control' id='Last_Name' placeholder = "Please Enter the Last Name"
            value={Last_Name} onChange={e => setLast_Name(e.target.value)}/>


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
            <input type="date" className='form-control' id='Birth_Date' placeholder = "Please Enter the Birth Date"
            value={Birth_Date} onChange={e => setBirth_Date(e.target.value)}/>


            <label htmlFor='Recruitment_Source' className='form-label'>Recruitment Source</label>
            <input type="text" className='form-control' id='Recruitment_Source' placeholder = "Please Enter the Recruitment Source"
            value={Recruitment_Source} onChange={e => setRecruitment_Source(e.target.value)}/>


            <label htmlFor='Recruitment_Type' className='form-label'>Recruitment Type</label>
            <input type="text" className='form-control' id='Recruitment_Type' placeholder = "Please Enter the Recruitment Type"
            value={Recruitment_Type} onChange={e => setRecruitment_Type(e.target.value)}/>


            <label htmlFor='Nationality' className='form-label'>Nationality</label>
            <input type="text" className='form-control' id='Nationality' placeholder = "Please Enter the Nationality"
            value={Nationality} onChange={e => setNationality(e.target.value)}/>


            <label htmlFor='Organisation' className='form-label'>Organisation</label>
            <input type="text" className='form-control' id='Organisation' placeholder = "Please Enter the Organisation"
            value={Organisation} onChange={e => setOrganisation(e.target.value)}/>
            

            <label htmlFor='Status' className='form-label'>Status</label>
            <input type="text" className='form-control' id='Status' placeholder = "Please Enter the Status"
            value={Status} onChange={e => setStatus(e.target.value)}/>  

            <br/>
            <button onClick={addDonor} className="btn btn-success">Add Donor</button>
        </div>
    )
}

function check(resp){
    console.log(resp)
    if (resp.Birth_Date == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD." || resp.Cumulative_Donation_Amount == "A valid integer is required." || resp.Current_Address == "This field may not be blank." || resp.Date_of_Last_Communication == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD." || resp.Date_of_Last_Donation == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD." || resp.Email == "This field may not be blank." || resp.Email_Communication_Rate == "A valid integer is required." || resp.Family_Name == "This field may not be blank." || resp.First_Donation_Date == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD." || resp.First_Name == "This field may not be blank." || resp.Last_Donation_Amount == "This field may not be blank." || resp.Last_communication == "This field may not be blank." || resp.Notes == "This field may not be blank." || resp.Number_of_Donations == "A valid integer is required." || resp.Phone == "A valid integer is required." || resp.Preferred_Communication == "This field may not be blank." || resp.Recruitment_Reason == "This field may not be blank." || resp.Recruitment_Source == "This field may not be blank." || resp.SEF_POC == "This field may not be blank." || resp.Title == "This field may not be blank.") {
        return false;
    }
    return true;
}