import React, { FC, useEffect, useState } from 'react';
import './NavBar.css';
import blue from "../blue.png"
import { Link } from "react-router-dom";

interface NavBarProps { }

const NavBar: FC<NavBarProps> = () => {
    const [userInfo, setuserInfo] = useState<any>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            console.log("userInfo", JSON.parse(userInfo).name);
            setIsLoggedIn(true);
            setuserInfo(JSON.parse(userInfo))
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
    }

    return (<nav className="navbar navbar-expand-lg navbar-light fixed-top d-flex custom-nav">
        <Link to="/">
            <img src={blue} className="photo" />
        </Link>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
        </div>
        <div className={"justify-content-end"}>
            <div className={"justify-content-end"}>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item me-4 mt-2">
                        {isLoggedIn ? (
                            <Link to="/login">
                                <span className='user-info'>Hi {userInfo?.name} </span>
                                <button type="button" className="logoutBtn" onClick={handleLogout} >Logout</button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button type="button" className="loginBtn">Login</button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
};

export default NavBar;
