import './Start.css';
import {Link} from "react-router-dom";
import buff from '../buff.png'
import React from "react";
import NavBar from "../NavBar/NavBar";
import Button from "@mui/material/Button";
import Footer from "../Footer/Footer";

function Start() {
    return (
        <React.Fragment>
            <div className='gradient-background'>
                <h2 className='study'>STUDY</h2>
                <h2 className='Buff'>BUFF</h2>
            </div>
            <div className ='body'>
                The new, easy-to-use, intuitive
                tool <br/> to help you find the perfect
                classes to take. <br/>
                Study Buff uses intelligent machine <br/>
                learning to aggregate data and present <br/>
                search results in a user-readable manner. <br/>
                All you have to do is enter a search and <br/>
                watch the magic happen!

            </div>

            <div className='start'><Link to = "/search">
                <button className="start-button"> GET STARTED</button>
            </Link></div>

            <nav className="navbar navbar-expand-lg navbar-light fixed-top d-flex">
                <img src={buff} className='photo ms-4 mt-2'></img>
                <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                </div>
                <div className={"justify-content-end"}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item me-4 mt-2">
                            <Link to = "/login">
                                <button type="button" className="cb">Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Footer></Footer>

        </React.Fragment>
    )
}

export default Start;
