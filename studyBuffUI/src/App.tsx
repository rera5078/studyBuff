import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Start from "./StartPage/Start";
import SearchPage from "./SearchPage/SearchPage";
import LoginPage from "./LoginPage/LoginPage"
import NavBar from "./NavBar/NavBar";
//import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';

function App() {
    return(
    <React.Fragment>
                <BrowserRouter>
                    <React.Fragment>
                        <Switch>
                            <Route exact path="/" component={Start}/>
                            <Route path="/search" component={SearchPage}/>
                            <Route path="/login" component={LoginPage}/>
                        </Switch>
                    </React.Fragment>
                </BrowserRouter>
    </React.Fragment>
    );
}

export default App;
