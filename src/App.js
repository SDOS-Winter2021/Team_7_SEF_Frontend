import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/NavBar/Navbar'
import { Auth } from './components/Auth/Auth'
import { Home } from './components/Home/Home'
import { Donor } from './components/Donor/Donor'
import { AddDonor } from './components/AddDonor/AddDonor'
import { EditDonor } from './components/EditDonor/EditDonor'
import { EP } from './components/EP/EP'
import { Note } from './components/Note/Note'
import { AddNote } from './components/AddNote/AddNote'
import { EditNote } from './components/EditNote/EditNote'
import { Transaction } from './components/Transaction/Transaction'
import { AddTransaction } from './components/AddTransaction/AddTransaction'
import { EditTransaction } from './components/EditTransaction/EditTransaction'
import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/auth' exact component={Auth}/>
                <Route path='/donor' exact component={Donor}/>
                <Route path='/donor/notes' exact component={Note}/>
                <Route path='/donor/notes/addNote' exact component={AddNote}/>
                <Route path='/donor/notes/editNote' exact component={EditNote}/>
                <Route path='/donor/addDonor' exact component={AddDonor}/>
                <Route path='/donor/donorEP' exact component={EP}/>
                <Route path='/donor/donorEP/editDonor' exact component={EditDonor}/>
                <Route path='/transaction' exact component={Transaction}/>
                <Route path='/transaction/addTransaction' exact component={AddTransaction}/>
                <Route path='/transaction/editTransaction' exact component={EditTransaction}/>
            </Switch>
        </Router>
    )
}

export default App
