import React,{useState,useEffect} from 'react'

export const Home = () => {
    const fetchURL = 'http://127.0.0.1:8000/api/donor/';
    const getItems = () => fetch(fetchURL).then(res => res.json());
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        getItems().then(data => setDonors(data));
      }, []);

    return (
        <div>
            Home
            {donors.map(donor => {
                return (
                    <div key={donor.id}>
                    <h2>{donor.First_Name}</h2>
                    <p>{donor.First_Donation_Date}</p>
                    <p>{donor.Number_of_Donations}</p>
                    <p>{donor.Cumulative_Donation_Amount}</p>
                    <p>{donor.Date_of_Last_Donation}</p>
                    <p>{donor.SEF_POC}</p>
                    </div>
                )
            })}
        </div>
    )
}