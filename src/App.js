import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Body from './components/Body';
import Login from './components/Login';
import { Router, Route } from 'react-router-dom'
import history from './history'
import Logout from './components/Logout';



class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Body} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Body} />
                    <Route path="/logout" component={Logout} />
                </div>
            </Router>
        );
  }
}
export default App;