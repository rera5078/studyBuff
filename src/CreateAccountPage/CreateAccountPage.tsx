import React, { FC } from 'react';
import './CreateAccountPage.css';
import NavBar from "../NavBar/NavBar";
import {Link} from "react-router-dom";
import buff from "../buff.png";
interface CreateAccountPageProps{}

const CreateAccountPage: FC<CreateAccountPageProps> = () => (
    <React.Fragment>
        <NavBar></NavBar>


        <div className='gradient-background'>
            <h2 className='All'>ALL OF STUDY BUFF</h2>
            <h2 className = 'Free'> COMPLETELY FREE</h2>

                <div className="jumbotron text-center">
                        <h2 className="Sign"> Sign up here.</h2>
                            <div className="email">
                                <input type="text" placeholder="Email" name="email" required></input>
                            </div>
                        <div className="first">
                            <input type="text" placeholder="First name" name="first" required></input>
                        </div>
                        <div className="last">
                            <input type="text" placeholder="Last name" name="last" required></input>
                        </div>
                        <div className="username">
                            <input type="text" placeholder="Username" name="username" required></input>
                        </div>

                        <div className="password">
                            <input type="password" placeholder="Password" name="password" required></input>
                        </div>

                            <div className="CreateButton">
                                <button className={'btn in w-75'} type={'submit'} style={{backgroundColor:"whitesmoke", color:'rgb(7,14,45)', fontSize:'18px', fontWeight:'bold'}}>Create Account</button>
                            </div>

                        <div className="Login">
                        <a href="/login">
                            <text style={{color: "white", fontStyle: "italic",textDecoration: "underline" }}>Already have an account? Login here! </text>
                        </a>
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


export default CreateAccountPage;
