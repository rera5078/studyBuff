import React, { FC } from 'react';
import './NavBar.css';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top d-flex">
        <a className="navbar-brand ms-3" href="#">Study Buff</a>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <form className={"form-inline my-2 my-lg-0 px-2"}>
                    <label>
                        <input className={"form-control mr-sm-2"} type="text" name="name" placeholder={"Search"}/>
                    </label>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </ul>
        </div>
        <div className={"justify-content-end"}>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item me-3">
                <a className="nav-link" href="#">Account</a>
            </li>
            </ul>
        </div>
    </nav>
      );

export default NavBar;
