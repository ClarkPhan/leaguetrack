import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Searchbar from '../searchbar/Searchbar';

import LeagueTrackLogo from '../../images/LeagueTrackLogo.png';

export default class Navbar extends PureComponent {
  render() {
    const {username} = this.props;
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={LeagueTrackLogo} alt="League Track Logo" />
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <Searchbar username={username} enableRedirect={false} position="right" />
              </div>
            </div>
            <div className="navbar-end">
              <a href="/" className="navbar-item">
                <span className="is-size-5">Home</span>
              </a>
              <a href="/champions/statistics" className="navbar-item">
                <span className="is-size-5">Champions</span>
              </a>
              <a href="/statistics/champions" className="navbar-item">
                <span className="is-size-5">Stats</span>
              </a>
              <a href="/ranking/ladder" className="navbar-item">
                <span className="is-size-5">Leaderboards</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.defaultProps = {
  username: null,
};

Navbar.propTypes = {
  username: PropTypes.string,
};
