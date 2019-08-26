import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Searchbar from './components/searchbar/Searchbar';
import LeagueTrackLogo from './images/LeagueTrackLogo.png';

import './css/App.css';

library.add(faSpinner);

const App = () => (
  <div>
    <div id="landingPage" className="section">
      <div className="container">
        <figure className="image"><img className="resize" src={LeagueTrackLogo} alt="logo" /></figure>
        <Searchbar />
      </div>
    </div>
    <div id="landingPageFooter" className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>LeagueTrack</strong> by <a href="http://clarkphan.com" target="_blank" rel="noopener noreferrer">Clark P</a>
        </p>
      </div>
    </div>
  </div>
);


export default App;
