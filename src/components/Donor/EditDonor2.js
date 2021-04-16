import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';

function EditDonor(props) {

    return (
        <div className="App">
            <Form donor = {props.donor}/>
        </div>
    )
}

export default EditDonor


function Form(props) {
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
    console.log(props.donor)
    // const history = useHistory()

    useEffect(() => {
        setPAN(props.donor.PAN)
        setTitle(props.donor.Title)
        setFirst_Name(props.donor.First_Name)
        setLast_Name(props.donor.Last_Name)
        setCurrent_Address(props.donor.Current_Address)
        setEmail(props.donor.Email)
        setPhone(props.donor.Phone)
        setBirth_Date(props.donor.Birth_Date)
        setRecruitment_Source(props.donor.Recruitment_Source)
        setRecruitment_Type(props.donor.Recruitment_Type)
        setNationality(props.donor.Nationality)
        setOrganisation(props.donor.Organisation)
        setStatus(props.donor.Status)
    }, [props.donor])

    const updateDonor = () => {
        APIService.UpdateDonor(props.donor.id, {
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
        alert("Donor Entry Updated");
        history.push('/');
    }

    const deleteBtn = () => {
        var donor_check = prompt("Please enter the First_Name of the Donor:", props.donor.First_Name);
        if (donor_check == null || donor_check !=props.donor.First_Name || donor_check == "") {
            alert("Try Again, Donor Name miss match")
        } 
        else {
            APIService.DeleteDonor(props.donor.id)
            .catch(error => console.log(error))
            alert("Donor Entry Deleted");
            history.push('/');
        }
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
            <input type="text" className='form-control' id='Birth_Date' placeholder = "Please Enter the Birth Date"
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

            <div className = "row">   
                <button onClick={updateDonor} className="btn btn-success">Update Donor</button>
            <div className = "col">
                <br/>
            </div>
                <button onClick = {deleteBtn} className = "btn btn-danger">Delete</button>
          </div>
        </div>
    )
}