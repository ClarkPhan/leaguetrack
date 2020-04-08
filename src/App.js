import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Searchbar from './components/searchbar/Searchbar';
import Footer from './components/footer/Footer';
import LeagueTrackLogo from './images/LeagueTrackLogo.png';

import './css/App.css';

library.add(faSpinner);

const App = () => (
  <div>
    <div className="hero is-fullheight">
      <div className="container">
        <figure className="image"><img className="resize" src={LeagueTrackLogo} alt="logo" /></figure>
        <Searchbar />
      </div>
      <Footer />
    </div>

  </div>
);


export default App;
