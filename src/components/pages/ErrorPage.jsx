import React, { PureComponent } from 'react';
import LeagueTrack404 from '../../images/404.png';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

export default class ErrorPage extends PureComponent {
  render() {
    return (
      <div id="error-page" className="hero is-fullheight">
        <Navbar />
        <div className="hero-body">
          <div className="container has-text-centered">
            <img src={LeagueTrack404} alt="sad face" />
            <h1 className="title is-1 is-spaced">404</h1>
            <h2 className="subtitle is-2">Page not found</h2>
            <h2 className="subtitle is-4">The Page you are looking for does not exist or an error occured.</h2>
            <h2 className="subtitle is-4">
              Go back or head over to
              {' '}
              <a href="/" rel="noopener noreferrer">
                leaguetrack.gg
              </a>
              {' '}
              to choose a new page.
            </h2>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
