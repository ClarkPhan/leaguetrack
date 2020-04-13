import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createProfile } from '../../redux/actions/summonerProfile/actionCreators';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

class SummonerPage extends PureComponent {
  render() {
    const { profile, username } = this.props;
    console.log(profile);
    if (profile === null) {
      return <Redirect to="/" />;
    }
    return (
      <div id="summoner-page" className="hero is-fullheight">
        <Navbar username={username} />
        <div className="level">
          <div className="level-item">
            <img className="profilePic-resize" src={profile.profileIcon} alt="profile icon" />
            <span className="is-size-1">{profile.summonerName}</span>
            {profile.isLoading ? <div className="has-text-centered"><FontAwesomeIcon icon="spinner" pulse size="6x" /></div>
              : (
                <div className="has-text-centered">
                  {profile.tier === undefined
                    ? (
                      <div>
                        <figure className="image is-280x280">
                          <img className="medal-resize" alt="ranked logo" src="http://opgg-static.akamaized.net/images/medals/default.png" />
                        </figure>
                      </div>
                    )
                    : (
                      <div>
                        <p><strong>{profile.leagueName}</strong></p>
                        <figure className="image is-280x280">
                          <img
                            className="medal-resize"
                            alt="ranked logo"
                            src={profile.tierMedal}
                          />
                        </figure>
                        <p>
                          <span className={
                            ` 
                              ${profile.tier === 'CHALLENGER' ? 'has-text-warning' : null}
                              ${profile.tier === 'GRANDMASTER' ? 'has-text-grandmaster' : null}
                              ${profile.tier === 'MASTER' ? 'has-text-master' : null}
                              ${profile.tier === 'DIAMOND' ? 'has-text-info' : null}
                              ${profile.tier === 'PLATINUM' ? 'has-text-primary' : null}
                              ${profile.tier === 'GOLD' ? 'has-text-gold' : null}
                              ${profile.tier === 'SILVER' ? 'has-text-silver' : null}
                              ${profile.tier === 'BRONZE' ? 'has-text-bronze' : null}
                              ${profile.tier === 'IRON' ? 'has-text-grey-light' : null}
                              is-size-4
                              has-text-weight-bold
                            `
                            }
                          >
                            {`${profile.tier}
                            ${profile.rank}`}
                          </span>
                        </p>
                        <p>Queue: Solo/Duo</p>
                        <p>
                          LP:
                          {profile.leaguePoints}
                        </p>
                        <p>
                          Wins:
                          {profile.wins}
                        </p>
                        <p>
                          Losses:
                          {profile.losses}
                        </p>
                      </div>
                    )}
                </div>
              )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SummonerPage.defaultProps = {
  profile: {},
  username: null,
};

SummonerPage.propTypes = {
  profile: PropTypes.shape({
    leagueName: PropTypes.string,
    tier: PropTypes.string,
    queueType: PropTypes.string,
    rank: PropTypes.string,
    summonerId: PropTypes.string,
    summonerName: PropTypes.string,
    leaguePoints: PropTypes.number,
    wins: PropTypes.number,
    losses: PropTypes.number,
    profileIcon: PropTypes.string,
    tierMedal: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
  username: PropTypes.string,
};

const mapStateToProps = (state) => ({ profile: state.summonerProfile });
const mapDispatchToProps = (dispatch) => ({
  updateSummonerData: (data) => dispatch(createProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummonerPage);
