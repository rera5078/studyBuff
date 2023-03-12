import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Start from "./StartPage/Start";
import SearchPage from "./SearchPage/SearchPage";
import NavBar from "./NavBar/NavBar";
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
    function navigateToSearchPage() {
        navigate('/search');
    }
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<NavBar />}>
                <Route index element={<Start />} />
                <Route path="search" element={<SearchPage />} />
            </Route>
        </Routes>

    return (

            <div className="App gradient-background">
                <header className="App-header">
                    <p>
                        STUDY <br /> BUFF
                    </p>
                </header>

                <div className="App-body">
                    <p>The new, easy-to-use, intuitive <br/>
                        tool to help you find the perfect <br/>
                        classes to take.
                    </p>
                </div>

                <div className="App-sub-body">
                    <p>Study Buff uses intelligent machine <br/>
                        learning to aggregate data and present <br/>
                        search results in a user-readable manner. <br/>
                        All you have to do is enter a search and <br/>
                        watch the magic happen!
                    </p>
                </div>

                <button className="button" onClick={navigateToSearchPage}> GET STARTED</button>

                <div className="header">
                    <nav>
                        <a href="#">
                            <img src="logo.png" alt="icon" className="icon"/>
                        </a>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Login</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="footer">
                    <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
