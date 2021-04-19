import React,{useState,useEffect} from 'react'
import NoteList from './NoteList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function NoteUser(props) {

  const getItems = () => APIService.GetNote();
  const [donor, setDonor] = useState('')
  const [notes, setNotes] = useState([])
  const history = useHistory();

  useEffect(() => {
    setDonor(props.donor)
    getItems().then(data => setNotes(data));
  }, [props])

    const editBtn = (note) => {
      localStorage.setItem('curr_note',JSON.stringify(note))
      history.push('/donor/notes/editNote');
    }
    
    const noteForm = () => {
      localStorage.setItem('curr_note',null)
      history.push('/donor/notes/addNote');
    }

    const topFunction = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      console.log('top button clicked')
    }

    return (
        <div className="App">
          <div className = "row">
            <div className = "col">
              <button onClick = {noteForm} className = "btn btn-primary">Add Note</button>
            </div>
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">        
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/donor">Donor</Breadcrumb.Item>
              <Breadcrumb.Item active>Notes</Breadcrumb.Item>
            </Breadcrumb>
            </div>
          </div>
          <div className = "row">
            <br/>
          </div>
            <NoteList notes = {notes} donor = {donor} editBtn = {editBtn}/>
          <div>
            <button onClick={topFunction} id="myBtn">Top</button>
          </div>
        </div>
    )
}

export default NoteUser