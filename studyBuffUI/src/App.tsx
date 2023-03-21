import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Start from "./StartPage/Start";
import SearchPage from "./SearchPage/SearchPage";
import LoginPage from "./LoginPage/LoginPage"

function App() {
    return(
    <React.Fragment>
        <meta name={"viewport"} content={"width=device-widt, initial scale=0.1"}></meta>
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
