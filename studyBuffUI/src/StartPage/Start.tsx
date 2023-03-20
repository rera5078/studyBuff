import React from 'react';
import logo from './logo.svg';
import './Start.css';
import SearchPage from "../SearchPage/SearchPage";
import {Link} from "react-router-dom";
import buff from '../buff.png'

function Start() {
    return (
        <div className="App gradient-background">
            <div className='row'>
                <div className='col-md-6 mt-5'>
                <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <ul className='list'>
                    <li className='item' style={{letterSpacing:'7px'}}>STUDY</li>
                    <li style={{letterSpacing:'10px'}}>BUFF</li>
                </ul>
            </header>
            </div>
            <div className='col-md-6' style={{marginTop:'150px'}}>
                <ul className = 'list' style={{listStyleType:'none'}}>
                    <li className='item2'>The new, easy-to-use, intuitive
                    tool <br/> to help you find the perfect
                    classes to take.</li>
                    <li className='item2'>Study Buff uses intelligent machine <br/>
                    learning to aggregate data and present <br/>
                    search results in a user-readable manner. <br/>
                    All you have to do is enter a search and <br/>
                    watch the magic happen!</li>
                    <li><Link to = "/search">
                    <button className="button mt-3"> GET STARTED</button>
                    </Link></li>
                </ul>
            </div>
            </div>

            {/*<div className="App-sub-title">*/}
            {/*    <p>ABOUT STUDY BUFF*/}
            {/*    </p>*/}
            {/*</div>*/}


            <nav className="navbar navbar-expand-lg navbar-light fixed-top d-flex">
                <img src={buff} className='photo ms-4 mt-2'></img>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
        </div>
        <div className={"justify-content-end"}>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item me-4">
                <a className="nav-link" href="#">Login</a>
            </li>
            </ul>
        </div>
    </nav>

            <div className="footer fixed-bottom">
                <div className='container mt-2'>
                <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
                </div>
            </div>

        </div>
    );
}

export default Start;
