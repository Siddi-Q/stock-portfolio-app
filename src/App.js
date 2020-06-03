import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import PrivateNavbar from "./components/privateNavbar.component";
import Signin from "./components/signin.component";
import Register from "./components/register.component";
import Portfolio from "./components/portfolio.component";
import TransactionsList from "./components/transactions-list.component"
import Logout from './components/logout.component';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.setIsAuth = this.setIsAuth.bind(this);

    this.state = {
      isAuth: false
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.post('http://localhost:5000/verify', null, {
        headers: {Authorization: sessionStorage.token}
      });
      res ? this.setIsAuth(true) : this.setIsAuth(false);
    }
    catch (error) {
      console.error(error);
    }
  }

  setIsAuth(value) {
    this.setState({
      isAuth: value
    });
  }
  
  render() {
    return (
      <Router>
        {this.state.isAuth ? <PrivateNavbar /> : <Navbar />}
        <br />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signin"/>}/>
          <Route exact path="/signin" render={() => this.state.isAuth ? <Redirect to="/portfolio"/> : <Signin setIsAuth={this.setIsAuth}/>}/>
          <Route exact path="/register" render={() => this.state.isAuth ? <Redirect to="/portfolio"/> : <Register setIsAuth={this.setIsAuth}/>}/>
          <Route exact path="/portfolio" render={() => this.state.isAuth ? <Portfolio/> : <Redirect to="/signin"/>}/>
          <Route exact path="/transactions" render={() => this.state.isAuth ? <TransactionsList /> : <Redirect to="/signin"/>}/>
          <Route exact path="/logout" render={() => this.state.isAuth ? <Logout setIsAuth={this.setIsAuth}/> : <Redirect to="/signin"/>}/>
        </Switch>
      </Router>
    );
  }
}

