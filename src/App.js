import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/NavBar/Navbar'
import { Auth } from './components/Auth/Auth'
import { Home } from './components/Home/Home'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/auth' exact component={Auth}/>
                <Route path='/' exact component={Home}/>
            </Switch>
        </Router>
    )
}

export default App
