import React, { FC } from 'react';
import './LoginPage.css';
import NavBar from "../NavBar/NavBar";
import { Link } from 'react-router-dom';
interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => (
    <React.Fragment>
        <NavBar></NavBar>

        <div className='background'>
            <h2 className='Welcome'>Welcome back to</h2>
            <h2 className = 'Study'> STUDY BUFF</h2>

            <div className="jumbo">
                <h2 className="login"> Login here.</h2>
                <div className="user">
                    <input type="text" placeholder="Username" name="username" required></input>
                </div>

                <div className="pass">
                    <input type="password" placeholder="Password" name="password" required></input>
                </div>

                <div className="LoginButton">
                    <button className={'btn in w-75'} type={'submit'} style={{backgroundColor:"whitesmoke", color:'rgb(7,14,45)', fontSize:'18px', fontWeight:'bold'}}>Login</button>
                </div>

                <div className="CreateAccount">
                    <Link to="/createAccount">
                        <text style={{color: "white", fontStyle: "italic",textDecoration: "underline" }}>Don't have an account? Create one here! </text>
                    </Link>
                </div>
            </div>

        </div>
        <div className="footer fixed-bottom">
            <div className='container mt-2'>
                <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
            </div>
        </div>
    </React.Fragment>
);

export default LoginPage;
