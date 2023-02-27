import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="App gradient-background">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <p>
            WELCOME <br />
              TO <br /> STUDY <br /> BUFF
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
              <p>The new, easy-to-use, intuitive <br />
                    tool to help you find the perfect <br />
                  classes to take.
              </p>
          </div>


          <div className="App-sub-title">
              <p>ABOUT STUDY BUFF
              </p>
          </div>

          <div className="App-sub-body">
              <p>Study Buff uses intelligent machine learning to aggregate <br />
                  data and present search results in a user-readable manner. <br />
                  All you have to do is enter a search and watch the magic happen!
              </p>
          </div>

      </div>
  );
}

export default App;
