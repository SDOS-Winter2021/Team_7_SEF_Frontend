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

    // User

    static GetStaff() {

      return fetch(`${base_url}staff/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }

}