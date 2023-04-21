import React, { FC, useEffect, useState } from 'react';
import './NavBar.css';
import blue from "../blue.png"
import { Link, useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

interface NavBarProps { }

const NavBar: FC<NavBarProps> = () => {
    const navigate = useNavigate();
    const [userInfo, setuserInfo] = useState<any>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            setIsLoggedIn(true);
            setuserInfo(JSON.parse(userInfo))
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        navigate('/login');
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (<nav className="navbar navbar-expand-lg navbar-light fixed-top d-flex custom-nav">
        <Link to="/">
            <img src={blue} className="photo" />
        </Link>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
        </div>
        <div className={"justify-content-end"}>
            <div className={"justify-content-end"}>
                <div className="navbar-nav mr-auto">
                    <div className="nav-item me-4 mt-2">
                        {isLoggedIn ? (
                            <>
                                <Button onClick={handleMenuOpen}>
                                    <Avatar><PersonIcon/></Avatar>
                                </Button>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                    <MenuItem>{userInfo?.name}</MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <span style={{marginRight: "16px"}}>Logout</span>
                                        <LogoutIcon />
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link to="/login">
                                <button type="button" className="loginBtn">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </nav>
    )
};

export default NavBar;
