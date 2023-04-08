import './Start.css';
import {Link} from "react-router-dom";
import buff from '../buff.png'

function Start() {
    return (
        <div className="gradient-background">
            <div className='container row d-inline-flex'>
                <div className='container col-md-6 mt-5 d-inline-flex'>
                <header className="App-header w-100">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <ul className='list'>
                    <li className='item' style={{letterSpacing:'7px'}}>STUDY</li>
                    <li style={{letterSpacing:'10px'}}>BUFF</li>
                </ul>
            </header>
            </div>
            <div className='container col-md-6 d-inline-flex' style={{marginTop:'150px', position:'relative'}}>
                <ul className = 'list ms-5 me-5 mt-3' style={{listStyleType:'none'}}>
                    <li className='item2 w-100'>The new, easy-to-use, intuitive
                    tool <br/> to help you find the perfect
                    classes to take.</li>
                    <li className='item2 w-100'>Study Buff uses intelligent machine <br/>
                    learning to aggregate data and present <br/>
                    search results in a user-readable manner. <br/>
                    All you have to do is enter a search and <br/>
                    watch the magic happen!</li>
                    <li className='item2 w-100'><Link to = "/search">
                    <button className="cb2 w-100 mt-4"> GET STARTED</button>
                    </Link></li>
                </ul>
            </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top d-flex">
                <img src={buff} className='photo ms-4 mt-2'></img>
        <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
        </div>
        <div className={"justify-content-end"}>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item me-4 mt-2">
                <Link to = "/login">
                    <button type="button" className="cb">Login</button>
                </Link>
            </li>
            </ul>
        </div>
    </nav>

            <div className="footer fixed-bottom">
                <div className='container mt-2'>
                <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
                </div>
            </div>

        </div>
    );
}

export default Start;
