import React, { FC, useState } from 'react';
import './CreateAccountPage.css';
import NavBar from "../NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Footer from "../Footer/Footer";
interface CreateAccountPageProps { }

interface SigninData {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    password: string;
}

const CreateAccountPage: FC<CreateAccountPageProps> = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [signinData, setLoginData] = useState<SigninData>(
        {
            email: '',
            firstName: '',
            lastName: '',
            userId: '',
            password: ''
        });

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...signinData, email: event.target.value });
    };

    const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...signinData, firstName: event.target.value });
    };

    const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...signinData, lastName: event.target.value });
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...signinData, userId: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...signinData, password: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_CREATE_ACCOUNT_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signinData),
            });


            if (response.ok) {
                navigate('/login');
                setErrorMessage("")    
            } 
            else if(response.status == 409){
                setErrorMessage("Username already exists!!") 
            }
            else {
                setErrorMessage("Create Account Failed Please Come Back later!!")
            }
        } catch (error) {
            setErrorMessage("Create Account Failed Please Come Back later!!")
        }
    };

    return (
        <React.Fragment>
            <NavBar></NavBar>
            <div className='gradient-background'>
                <h2 className='All'>ALL OF STUDY BUFF</h2>
                <h2 className='Free'> COMPLETELY FREE</h2>

                <div className="jumbotron text-center">
                    <h2 className="Sign"> Sign up here.</h2>
                    {errorMessage && <div className='errorContainer'>
                        <p className='errorText'>{errorMessage}</p>
                    </div>}

                    <form onSubmit={handleSubmit}>
                        <div className="email">
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={signinData.email}
                                onChange={handleEmailChange}
                                required></input>
                        </div>
                        <div className="first">
                            <input
                                type="text"
                                placeholder="First name"
                                name="first"
                                value={signinData.firstName}
                                onChange={handleFirstnameChange}
                                required></input>
                        </div>
                        <div className="last">
                            <input
                                type="text"
                                placeholder="Last name"
                                name="last"
                                value={signinData.lastName}
                                onChange={handleLastnameChange}
                                required></input>
                        </div>
                        <div className="username">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={signinData.userId}
                                onChange={handleUsernameChange}
                                required></input>
                        </div>

                        <div className="password">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={signinData.password}
                                onChange={handlePasswordChange}
                                required></input>
                        </div>

                        <div className="CreateButton">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!signinData.email || !signinData.password}
                                fullWidth
                                data-testid={"Login"}
                                style={{ backgroundColor: "whitesmoke", color: 'rgb(7,14,45)', fontSize: '18px', fontWeight: 'bold' }}
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>

                    <div className="Login">
                        <Link to="/login">
                            <text style={{ color: "white", fontStyle: "italic", textDecoration: "underline" }}>Already have an account? Login here! </text>
                        </Link>
                    </div>
                </div>

            </div>

            <Footer></Footer>
        </React.Fragment>

    )
}


export default CreateAccountPage;
