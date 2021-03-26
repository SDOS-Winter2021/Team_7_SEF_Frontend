import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/NavBar/Navbar'
import { Auth } from './components/Auth/Auth'
import { Home } from './components/Home/Home'
import { Donor } from './components/Donor/Donor'
import { Transaction } from './components/Transaction/Transaction'
import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/auth' exact component={Auth}/>
                <Route path='/donor' exact component={Donor}/>
                <Route path='/transaction' exact component={Transaction}/>
            </Switch>
        </Router>
    )
}

export default App
