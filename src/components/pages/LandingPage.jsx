import React, { PureComponent } from 'react';
import LandingPageSplash from '../../images/LandingPageSplash.png';
import Searchbar from '../searchbar/Searchbar';
import Footer from '../footer/Footer';

export default class LandingPage extends PureComponent {
  render() {
    return (
      <div id="landing-page" className="hero is-fullheight">
        <div className="container">
          <figure className="image"><img className="resize" src={LandingPageSplash} alt="logo" /></figure>
          <Searchbar />
        </div>
        <Footer />
      </div>
    );
  }
}
