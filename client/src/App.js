import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import Navbar from "./components/navbars/navbar.component";
import PrivateNavbar from "./components/navbars/privateNavbar.component";
import Signin from "./components/auth/signin.component";
import Register from "./components/auth/register.component";
import Portfolio from "./components/portfolio/portfolio.component";
import TransactionsList from "./components/transactions/transactions-list.component"
import Company from  './components/company/company.component';
import Logout from './components/auth/logout.component';
import { verify } from './services/auth.service';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    verify()
    .then(res => {
      res ? setIsAuth(true) : setIsAuth(false);
    })
    .catch(error => {
      console.error(error);
    })
  }, []);

  return (
    <Router>
      {isAuth ? <PrivateNavbar /> : <Navbar />}
      <br />
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signin"/>}/>
          <Route exact path="/signin" render={() => isAuth ? <Redirect to="/portfolio"/> : <Signin setIsAuth={setIsAuth}/>}/>
          <Route exact path="/register" render={() => isAuth ? <Redirect to="/portfolio"/> : <Register setIsAuth={setIsAuth}/>}/>
          <Route exact path="/portfolio" render={() => isAuth ? <Portfolio/> : <Redirect to="/signin"/>}/>
          <Route exact path="/transactions" render={() => isAuth ? <TransactionsList /> : <Redirect to="/signin"/>}/>
          <Route exact path="/:ticker/company" render={() => isAuth ? <Company /> : <Redirect to="/signin"/>} />
          <Route exact path="/logout" render={() => isAuth ? <Logout setIsAuth={setIsAuth}/> : <Redirect to="/signin"/>}/>
        </Switch>
      </div>
    </Router>
  );
}
