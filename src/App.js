import React, { Component } from 'react';
import './App.css';

 import Admin from './Pages/Admin';
// import Login from './Login';
import User from './Pages/User';


import {HashRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  

  render() {
    return (
      <HashRouter> 
        <div className="App">
          <Switch>
            <Route exact path="/" component={User} />
            <Route path="/admin" component={Admin} />
            { /* <Route path="/login" component={Login} /> */ }
          </Switch>
        </div>
      </HashRouter>
    );
  }
}


export default App;

