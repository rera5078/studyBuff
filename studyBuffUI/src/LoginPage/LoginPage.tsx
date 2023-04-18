import React, { FC, useState } from 'react';
import './LoginPage.css';
import NavBar from "../NavBar/NavBar";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";

interface LoginPageProps { }

interface LoginData {
    username: string;
    password: string;
}

const LoginPage: FC<LoginPageProps> = () => {
    const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, username: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, password: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/userinfo/isAuthorized', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                setErrorMessage("");
                console.log('Login successful');
                navigate('/search');

            } else {
                setErrorMessage("Username and Password didn't Match. Try Again");
                console.log('Login failed');
            }
        } catch (error) {
            console.error('API call failed', error);
        }
    };

    return (
        <React.Fragment>
            <NavBar></NavBar>
            <div className='background'>
                <h2 className='Welcome'>Welcome back to</h2>
                <h2 className='Study'> STUDY BUFF</h2>
                <div className="jumbo">
                    {errorMessage && <div className='errorContainer'>
                        <p className='errorText'>Username and Password didn't Match. Try Again</p>
                    </div>}
                    <h2 className="login"> Login here</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="user">
                            <input
                                placeholder="Username"
                                name="username"
                                type="text"
                                value={loginData.username}
                                onChange={handleUsernameChange}
                                style={{ backgroundColor: "whitesmoke", color: 'rgb(7,14,45)', fontWeight: 'bold' }}
                            />
                        </div>
                        <div className="pass">
                            <input
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={loginData.password}
                                onChange={handlePasswordChange}
                                style={{ backgroundColor: "whitesmoke", color: 'rgb(7,14,45)', fontWeight: 'bold' }}
                            />
                        </div>
                        <div className="LoginButton">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!loginData.username || !loginData.password}
                                fullWidth
                                data-testid={"Login"}
                                style={{ backgroundColor: "whitesmoke", color: 'rgb(7,14,45)', fontSize: '18px', fontWeight: 'bold' }}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className="CreateAccount">
                        <Link to="/createAccount">
                            <text style={{ color: "white", fontStyle: "italic", textDecoration: "underline" }}>Don't have an account? Create one here! </text>
                        </Link>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </React.Fragment>
    )
}

export default LoginPage;
