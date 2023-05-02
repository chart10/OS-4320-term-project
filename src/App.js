import logo from './assets/react-logo.jpg';
import wireshark from './assets/wireshark.png';
import flyio from './assets/flyio-logo.jpg';
import mysql from './assets/mysql-logo.png';
import flask from './assets/flask-logo.png';
import Dashboard from './Dashboard.js';
import React from 'react';
import './App.css';
// import sslkeylog from 'sslkeylog';

// sslkeylog.setLog('/tmp/otherkeys.log').hookAll();

function App() {
  return (
    <div className='App'>
      <Dashboard />
      <div className='App-footer'>
        <p>
          This is a project developed by Christian Hart to analyze packet data
          sent to and from a website.
        </p>
        <div className='technologies'>
          <a href='https://react.dev/'>
            <div className='tech-item'>
              <img src={logo} className='App-logo' alt='react logo' />
              <h6>React JS</h6>
            </div>
          </a>
          <a href='https://flask.palletsprojects.com/en/2.3.x/'>
            <div className='tech-item'>
              <img src={flask} className='App-logo' alt='react logo' />
              <h6>Python Flask</h6>
            </div>
          </a>
          <a href='https://www.mysql.com/'>
            <div className='tech-item'>
              <img src={mysql} className='App-logo' alt='SQLite logo' />
              <h6>MySQL</h6>
            </div>
          </a>
          <a href='https://fly.io/'>
            <div className='tech-item'>
              <img src={flyio} className='App-logo' alt='fly.io logo' />
              <h6>Fly.io</h6>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
