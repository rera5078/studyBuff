import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Start from "./StartPage/Start";
import SearchPage from "./SearchPage/SearchPage";
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
                        </Switch>
                    </React.Fragment>
                </BrowserRouter>
    </React.Fragment>
    );
}

export default App;
