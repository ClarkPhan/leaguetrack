import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Searchbar from './components/searchbar/Searchbar';
import SummonerPage from './components/pages/SummonerPage';
import Footer from './components/footer/Footer';
import LeagueTrackLogo from './images/LeagueTrackLogo.png';
import './css/App.css';

library.add(faSpinner);

const App = () => (
  <Router>
    <Route
      exact
      path="/"
      render={() => (
        <div className="hero is-fullheight">
          <div className="container">
            <figure className="image"><img className="resize" src={LeagueTrackLogo} alt="logo" /></figure>
            <Searchbar />
          </div>
          <Footer />
        </div>
      )}
    />
    <Route path="/summoner/:username" component={SummonerPage} />
  </Router>
);


export default App;
