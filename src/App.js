import React from 'react';
import Icon from './components/icons/icon.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div className="card">
        <div className="about-me">
          <img className="profile-img"
          alt="Profile"
          src="https://lh3.googleusercontent.com/-yQzqgKjcLhU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdftEvVOQQ_YBC7wVU2ur8iqFQvTw.CMID/s192-c/photo.jpg"></img>
          <p className="intro-text">
              Hi there! I'm Balanarayanan, a frontend engineer working 
              at <a rel="noopener noreferrer" target="_blank" href="https://web.archive.org/web/19990423181407/http://www.google.com/company.html">Google</a>. 
              Previously used to build UIs for <a rel="noopener noreferrer" target="_blank" href="https://www.redbus.in/">Redbus</a>.
              <br></br><br></br>
              I'm passionate about UIs, browser tech, prototyping with Arduinos/Pis and
              mostly anything tech in general.
          </p>
          <div className="contact-me">
            <Icon type="LINKEDIN" link="https://www.linkedin.com/in/balanarayanan-s/" />
            <Icon type="GITHUB" link="https://github.com/b11n" />
            <Icon type="TWITTER" link="https://twitter.com/balanxyz" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
