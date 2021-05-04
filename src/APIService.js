
import axios from 'axios';

const base_url = 'https://sef-dashboard.herokuapp.com/api/'


export default class APIService {

  // Donor

    static GetDonor() {

      return fetch(`${base_url}donor/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }
    
    static UpdateDonor(donor_id, body) {

     return fetch(`${base_url}donor/${donor_id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json())


    }

    static AddDonor(body) {

      return fetch(`${base_url}donor/`, {
        'method':'POST',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }

    static DeleteDonor(donor_id) {

      return fetch(`${base_url}donor/${donor_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type':'application/json'
          }

     })

    }

    // Transaction

    static GetTransaction() {

      return fetch(`${base_url}transaction/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }
    
    static UpdateTransaction(transaction_id, body) {

     return fetch(`${base_url}transaction/${transaction_id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json())


    }

    static AddTransaction(body) {

      return fetch(`${base_url}transaction/`, {
        'method':'POST',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }

    static DeleteTransaction(transaction_id) {

      return fetch(`${base_url}transaction/${transaction_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type':'application/json'
          }

     })

    }

    // Note

    static GetNote() {

      return fetch(`${base_url}note/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }
    
    static UpdateNote(note_id, body) {

     return fetch(`${base_url}note/${note_id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json())


    }

    static AddNote(body) {

      return fetch(`${base_url}note/`, {
        'method':'POST',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }

    static DeleteNote(note_id) {

      return fetch(`${base_url}note/${note_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type':'application/json'
          }

     })

    }

    //Receipt 

    static GetReceipts(donor_PAN) {

      return axios({
        method: "POST",
        url: "https://sefdash.herokuapp.com/api/donor/donorEP/get_recipts/",
        data: donor_PAN,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(resp => resp.json()) 

    }

    //EP Task

    static AddEPTask(body) {

      return axios({
        method: "POST",
        url: "https://sefdash.herokuapp.com/api/donor/donorEP/get_recipts/",
        data: JSON.stringify(body),
        headers: { "Content-Type": "multipart/form-data" },
      }).then(resp => resp.json())
      .catch(error =>  console.log(error))

    }

    // EP

    static GetEP() {

      return fetch(`${base_url}ep/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }
    
    static UpdateEP(ep_id, body) {

     return fetch(`${base_url}ep/${ep_id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json())


    }

    static AddEP(body) {

      return fetch(`${base_url}ep/`, {
        'method':'POST',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }

    static DeleteEP(ep_id) {

      return fetch(`${base_url}ep/${ep_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type':'application/json'
          }

     })

    }
    
    // User

    static GetStaff() {

      return fetch(`${base_url}staff/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }

    //Email

    static Email(form) {

      axios({
        method: "POST",
        url: "https://sef-dashboard.herokuapp.com/email/",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log('no error')
          console.log(response);
        })
        .catch(function (response) {
          console.log('error')
          console.log(response);
        });

    }
}