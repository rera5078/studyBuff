import React, { FC } from 'react';
import './NavBar.css';
import blue from "../blue.png"
import { Link } from "react-router-dom";

interface NavBarProps { }

const iconText = "<StudyBuff />"

const NavBar: FC<NavBarProps> = () => (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top d-flex custom-nav">
        <Link to="/">
            <img src={blue} className="photo" />
            <span className='iconText'>{iconText}</span>
        </Link>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
        </div>
    </nav>
);

export default NavBar;
