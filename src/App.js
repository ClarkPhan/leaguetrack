import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/navbar/Navbar';
import SummonerPage from './components/pages/SummonerPage';
import './css/App.css';
import LandingPage from './components/pages/LandingPage';

library.add(faSpinner);

const App = () => (
  <Router>
    <Route
      exact
      path="/"
      component={LandingPage}
    />
    <Route
      path="/summoner/:username"
      component={() => (
        <div>
          <Navbar />
          <SummonerPage />
        </div>
      )}
    />
  </Router>
);


export default App;
