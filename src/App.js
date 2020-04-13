import React from 'react';
import { BrowserRouter as Router, Route, useParams, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import LandingPage from './components/pages/LandingPage';
import SummonerPage from './components/pages/SummonerPage';
import './css/App.css';
import ErrorPage from './components/pages/ErrorPage';

library.add(faSpinner);

const App = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        component={LandingPage}
      />
      <Route
        path="/summoner/:username"
        // eslint-disable-next-line react/no-children-prop
        children={<Child />}
      />
      <Route
        path="*"
        component={ErrorPage}
      />
    </Switch>
  </Router>
);

const Child = () => {
  const { username } = useParams();
  return (
    <SummonerPage username={username} />
  );
};

export default App;
