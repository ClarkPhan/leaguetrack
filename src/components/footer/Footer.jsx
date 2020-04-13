import React, { PureComponent } from 'react';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>LeagueTrack</strong>
            {' '}
            <span className="has-text-black">by</span>
            {' '}
            <a href="http://clarkphan.com" target="_blank" rel="noopener noreferrer">Clark P</a>
          </p>
        </div>
      </footer>
    );
  }
}
