import React, { FC } from 'react';
import './SignInPage.css';
import NavBar from "../NavBar/NavBar";
interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = () => (
    <React.Fragment>
        <NavBar></NavBar>
        <div className={'container h-100 align-items-center justify-content-center'} style={{width:"500px"}}>
            <div className="jumbotron text-center">
                <h2 className={'display-4'} style={{color:"#ffffff"}}>SignIn</h2>
                <form>
                    <div className="container w-100 mt-3">
                        <input type="text" placeholder="Enter Username" name="uname" required></input>
                    </div>
                    <div className="container mt-3 w-100">
                        <input type="password" placeholder="Enter Password" name="pass" required></input>
                    </div>
                    <div className="container mt-5 w-100">
                        <button className={'btn in w-75'} type={'submit'} style={{backgroundColor:"whitesmoke", color:'rgb(7,14,45)', fontSize:'18px', fontWeight:'bold'}}>Log In</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="footer fixed-bottom">
            <div className='container mt-2'>
                <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
            </div>
        </div>
    </React.Fragment>
);

export default SignInPage;
