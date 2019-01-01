import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import LeagueTrackLogo from './images/LeagueTrackLogo.png';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './css/App.css';
library.add(faSpinner);

class App extends Component {
  render() {
    return (
      <div>
        <div id="landingPage" className="section">
          <div className="container">
            <figure className="image"><img className="resize" src={LeagueTrackLogo} alt="logo" /></figure>
            <Searchbar />
          </div>
        </div>
        <div id="landingPageFooter" className="footer">
          <div className="content has-text-centered">
            <p><strong>LeagueTrack</strong> by <a href="http://clarkphan.com" target="_blank" rel="noopener noreferrer">Clark P</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
