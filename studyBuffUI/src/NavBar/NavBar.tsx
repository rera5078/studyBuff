import React, { FC } from 'react';
import './NavBar.css';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top d-flex custom-nav">
        <a className="navbar-brand ms-3" style={{color:'#ffffff'}} href="/">Study Buff</a>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
        </div>
        <div className={"justify-content-end"}>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item me-3">
                <a className="nav-link" href="#" style={{color:'#ffffff'}}>Account</a>
            </li>
            </ul>
        </div>
    </nav>
      );

export default NavBar;
