export default class APIService {

  // Donor

    static GetDonor() {

      return fetch(`http://127.0.0.1:8000/api/donor/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }
    
    static UpdateDonor(donor_id, body) {

     return fetch(`http://127.0.0.1:8000/api/donor/${donor_id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json())


    }

    static AddDonor(body) {

      return fetch('http://127.0.0.1:8000/api/donor/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }

    static DeleteDonor(donor_id) {

      return fetch(`http://127.0.0.1:8000/api/donor/${donor_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type':'application/json'
          }

     })

    }

    // Transaction

    static GetTransaction() {

      return fetch(`http://127.0.0.1:8000/api/transaction/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }
    
    static UpdateTransaction(transaction_id, body) {

     return fetch(`http://127.0.0.1:8000/api/transaction/${transaction_id}/`, {
        'method':'PUT',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json())


    }

    static AddTransaction(body) {

      return fetch('http://127.0.0.1:8000/api/transaction/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }

    static DeleteTransaction(transaction_id) {

      return fetch(`http://127.0.0.1:8000/api/transaction/${transaction_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type':'application/json'
          }

     })

    }

    // User

    static GetStaff() {

      return fetch(`http://127.0.0.1:8000/api/staff/`, {
         'method':'GET',
         headers: {
             'Content-Type':'application/json'
           } 
      }).then(resp => resp.json())

    }

}