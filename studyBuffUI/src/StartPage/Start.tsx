import './Start.css';
import {Link, useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import white from '../white.png'
import Footer from "../Footer/Footer";
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

function Start() {
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
    
    return (
        <React.Fragment>
            <div className='start-gradient-background'>
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
                <img src={white} className='photo ms-4 mt-2'></img>
                <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                </div>
                <div className={"justify-content-end"}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item me-4 mt-2">
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
                                <button type="button" className="cb">Login</button>
                            </Link>
                        )}
                        </li>
                    </ul>
                </div>
            </nav>
            <Footer></Footer>

        </React.Fragment>
    )
}

export default Start;
