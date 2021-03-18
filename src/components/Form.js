import React,{useState,useEffect} from 'react'
import APIService from '../APIService';

function Form(props) {
    const [First_Name, setFirst_Name] = useState('')

    useEffect(() => {
        setFirst_Name(props.donor.First_Name)
    }, [props.donor])

    const updateDonor = () => {
        APIService.UpdateDonor(props.donor.id, {First_Name})
        .then(resp => props.updatedInformation(resp))


    }

    const addDonor = () => {
        APIService.AddDonor({First_Name})
        .then(resp => props.insertedInformation(resp))
    }

    return (
        <div>
            {props.donor ? (
                <div className="mb-3">
                    <label htmlFor='First_Name' className='form-label'>First Name</label>
                    <input type="text" className='form-control' id='First_Name' placeholder = "Please Enter the First Name"
                    value={First_Name} onChange={e => setFirst_Name(e.target.value)}
                    />
                    <br/>
                    {props.donor.id ? 
                    <button onClick={updateDonor} className="btn btn-success">Update Donor</button> : 
                    <button onClick={addDonor} className="btn btn-success">Add Donor</button>
                    }
                </div>
            ): null}
        </div>
    )
}

export default Form
