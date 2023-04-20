import React, { useState } from 'react';
import './App.css';
import favicon from "../public/logotransparent.png"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./StartPage/Start";
import SearchPage from "./SearchPage/SearchPage";
import LoginPage from "./LoginPage/LoginPage"
import CreateAccountPage from "./CreateAccountPage/CreateAccountPage";
import Recommendation from './RecommendationPage/Recommendation';
import Loading from "./Loading/Loading";
import { SearchResult } from './RecommendationPage/api';

function App() {
    const [results, setResults] = useState<SearchResult>();
    return (
        <React.Fragment>
            <meta name={"viewport"} content={"width=device-width, initial scale=0.1"}></meta>
            <BrowserRouter>
                <React.Fragment>
                    <Routes>
                        <Route path="/" Component={Start} />
                        <Route path="/search" Component={() => <SearchPage setResults={setResults} />}/>
                        <Route path="/login" Component={LoginPage} />
                        <Route path="/createAccount" Component={CreateAccountPage} />
                        <Route path="/recommendation" Component={() => <Recommendation results={results} />} />
                        <Route path="/loading" Component={Loading} />
                    </Routes>
                </React.Fragment>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
