export default class APIService {
    
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


}