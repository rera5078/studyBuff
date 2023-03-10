import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="App gradient-background">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <p>
            STUDY <br /> BUFF
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
          </a>
        </header>

          <div className="App-body">
              <p>The new, easy-to-use, intuitive <br/>
                  tool to help you find the perfect <br/>
                  classes to take.
              </p>
          </div>


          {/*<div className="App-sub-title">*/}
          {/*    <p>ABOUT STUDY BUFF*/}
          {/*    </p>*/}
          {/*</div>*/}

          <div className="App-sub-body">
              <p>Study Buff uses intelligent machine <br/>
                  learning to aggregate data and present <br/>
                  search results in a user-readable manner. <br/>
                  All you have to do is enter a search and <br/>
                  watch the magic happen!
              </p>
          </div>

          <button className="button">GET STARTED</button>

          <div className="header">
              <nav>
                  <a href="#">
                      {/*<img src={logo} className="App-logo" alt="logo" />*/}
                      <img src="logo.png" alt="icon" className="icon"/>
                  </a>
                  <ul>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">Login</a></li>
                  </ul>
              </nav>
          </div>

          <div className="footer">
              <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
          </div>

      </div>
  );
}

export default App;
