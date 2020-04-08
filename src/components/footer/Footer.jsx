import React, { Component } from 'react';

class Footer extends Component {
  constructor() {
    super();
    this.state = {};
  }


  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>LeagueTrack</strong>
            {' '}
            by
            {' '}
            <a href="http://clarkphan.com" target="_blank" rel="noopener noreferrer">Clark P</a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
