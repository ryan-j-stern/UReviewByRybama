import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Landing from './pages/landing.js'
import SignUp from './pages/users.signup'
import Login from './pages/users.login'


// Maps out every URL that has a component and links that URL with corresponding component
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/users/signup' component={SignUp} />
          <Route exact path='/users/login' component={Login} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
