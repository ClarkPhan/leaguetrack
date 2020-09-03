/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { showMoreMatches } from '../../redux/actions/summonerProfile/actionCreators';
import NoItem from '../../images/NoItem.png';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

class SummonerPage extends PureComponent {
  generateMatchHistory = () => {
    const { profile: { matchHistory }, limit } = this.props;
    const { matches } = matchHistory;
    const renderedMatchHistory = [];
    if (matchHistory !== null) {
      for (let i = 0; i < limit; i += 1) {
        const match = matches[i];
        renderedMatchHistory.push(
          <div key={match.gameId}>
            <div className="columns is-mobile is-gapless">
              <div className="column is-one-fifth">
                <div className="level adjust-margin">
                  <div className="level-item">
                    <span className="is-size-6 has-text-centered">{match.queue}</span>
                  </div>
                </div>
                <div className="level adjust-margin">
                  <div className="level-item">
                    <span className="is-size-6 has-text-centered">{match.gameCreation}</span>
                  </div>
                </div>
                <div className="has-text-centered is-size-6 has-text-weight-semibold">
                  {match.win ? <span className="has-text-success">VICTORY</span> : <span className="has-text-danger">DEFEAT</span>}
                </div>
                <div className="level adjust-margin">
                  <div className="level-item">
                    <span className=" is-size-6 has-text-centered">{match.gameDuration}</span>
                  </div>
                </div>
              </div>
              <div className="column is-narrow">
                <span className="image is-64x64 has-text-centered">
                  <img className="is-rounded" src={match.championIcon} alt="championIcon" />
                  <span className="is-size-6">{match.champion}</span>
                </span>

              </div>
              <div className="column is-narrow">
                <span className="image is-32x32">
                  <img src={match.spell1} alt="spell1Icon" />
                </span>
                <span className="image is-32x32">
                  <img src={match.spell2} alt="spell2Icon" />
                </span>
              </div>
              <div className="column is-narrow">
                <span className="image is-32x32">
                  <i className="fas fa-circle fa-stack-2x" />
                  <img className="fa-stack-1x" src={match.rune1} alt="rune2Icon" />
                </span>
                <span className="image is-32x32">
                  <img className="is-rounded" src={match.rune2} alt="rune2Icon" />
                </span>
              </div>
              <div className="column is-one-fifth">
                <div className="level adjust-margin">
                  <div className="level-item">
                    <span className="is-size-4">
                      {match.kills}
                      /
                      <span className="has-text-danger">{match.deaths}</span>
                      /
                      {match.assists}
                    </span>
                  </div>
                </div>
                <div className="level adjust-margin">
                  <div className="level-item">
                    <span className="is-size-5 has-text-weight-bold">
                      {match.deaths === 0 ? <span>Perfect KDA</span>
                        : (
                          <span>
                            {((match.kills + match.assists) / match.deaths).toFixed(2)}
                            :1 KDA
                          </span>
                        )}
                    </span>
                  </div>
                </div>
                <div className="level adjust-margin">
                  <div className="level-item">
                    <div className="tags">
                      {
                        match.pentaKills > 0 ? <span className="tag is-danger">Penta Kill</span>
                          : match.quadraKills > 0 ? <span className="tag is-danger">Quadra Kill</span>
                            : match.tripleKills > 0 ? <span className="tag is-danger">Triple Kill</span>
                              : match.doubleKills > 0 ? <span className="tag is-danger">Double Kill</span>
                                : null
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-narrow">
                <div className="level adjust-margin">
                  <div className="level-item">
                    <span className="item image is-32x32">
                      {match.item0 ? <img src={match.item0} alt="item0Icon" /> : <img src={NoItem} alt="item0NoItemIcon" />}
                    </span>
                    <span className="item image is-32x32">
                      {match.item1 ? <img src={match.item1} alt="item1Icon" /> : <img src={NoItem} alt="item1NoItemIcon" />}
                    </span>
                    <span className="item image is-32x32">
                      {match.item2 ? <img src={match.item2} alt="item2Icon" /> : <img src={NoItem} alt="item2NoItemIcon" />}
                    </span>
                  </div>
                </div>
                <div className="level adjust-margin">
                  <div className="level-item">
                    <span className="item image is-32x32">
                      {match.item3 ? <img src={match.item3} alt="item3Icon" /> : <img src={NoItem} alt="item3NoItemIcon" />}
                    </span>
                    <span className="item image is-32x32">
                      {match.item4 ? <img src={match.item4} alt="item4Icon" /> : <img src={NoItem} alt="item4NoItemIcon" />}
                    </span>
                    <span className="item image is-32x32">
                      {match.item5 ? <img src={match.item5} alt="item5Icon" /> : <img src={NoItem} alt="item5NoItemIcon" />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>,
        );
      }
      return (renderedMatchHistory);
    }
    return null;
  }

  handleShowMore = () => {
    const { showMore } = this.props;
    showMore();
  }

  createMiniSeries = (miniSeries) => {
    const { progress } = miniSeries;
    console.log(progress);
    const miniSeriesComponent = [];
    for (let i = 0; i < progress.length; i += 1) {
      if (progress.charAt(i) === 'N') {
        miniSeriesComponent.push(<FontAwesomeIcon className="fa-lg" icon={faCircle} />);
      }
      if (progress.charAt(i) === 'W') {
        miniSeriesComponent.push(<FontAwesomeIcon className="fa-lg has-text-success" icon={faCheckCircle} />);
      }
      if (progress.charAt(i) === 'L') {
        miniSeriesComponent.push(<FontAwesomeIcon className="fa-lg has-text-danger" icon={faTimesCircle} />);
      }
    }
    return (
      <div>
        <span className="is-size-7">
          Series In Progress
          <br />
        </span>
        {miniSeriesComponent}
      </div>
    );
  };

  render() {
    const { profile, username, limit } = this.props;
    if (profile === null) {
      return <Redirect to="/" />;
    }
    return (
      <div id="summoner-page" className="hero is-fullheight">
        <Navbar username={username} />
        <section className="section">
          <div className="level">
            <div className="level-item">
              <img className="profilePic-resize" src={profile.profileIcon} alt="profile icon" />
            </div>
          </div>
          <div className="level">
            <div className="level-item">
              <span className="is-size-3">
                {profile.summonerName}
                {' '}
                {
                  profile.hotStreak === true && profile.matchHistory.matches[0].win === true
                  && profile.matchHistory.matches[1].win === true
                  && profile.matchHistory.matches[2].win === true
                    ? <span className="has-tooltip-top has-tooltip-arrow has-tooltip-info has-text-danger" data-tooltip="Hot Streak!"><FontAwesomeIcon icon="fire" /></span> : null
                }
                {' '}
                {profile.freshBlood ? <span className="has-tooltip-top has-tooltip-arrow has-tooltip-info has-text-warning" data-tooltip="Recently Promoted"><FontAwesomeIcon icon="star" /></span> : null}
                {' '}
                {profile.veteran ? <span className="has-tooltip-top has-tooltip-arrow has-tooltip-info" data-tooltip="Veteran"><FontAwesomeIcon icon="medal" /></span> : null}
              </span>
            </div>
          </div>
        </section>

        <div className="level">
          <div className="level-item">
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
                        <p className="is-size-6">Ranked Solo/Duo</p>
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
                        <span className="has-text-weight-bold">
                          {profile.leaguePoints}
                          {' '}
                          LP
                        </span>
                        {' / '}

                        {profile.wins}
                        {'W '}
                        {profile.losses}
                        {'L '}
                        <p>
                          Win Ratio
                          {' '}
                          {profile.winRatio}
                          %
                        </p>
                        {profile.miniSeries ? this.createMiniSeries(profile.miniSeries) : null}
                      </div>
                    )}
                </div>
              )}
          </div>
          <div className="level-item">
            <div className="container is-fluid">
              {this.generateMatchHistory()}
              <div className="has-text-centered">
                <button
                  className="button"
                  type="button"
                  onClick={this.handleShowMore}
                  style={limit === 10 ? { display: 'none' } : null}
                >
                  Show More
                </button>
              </div>
            </div>
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
  limit: 5,
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
    winRatio: PropTypes.number,
    profileIcon: PropTypes.string,
    tierMedal: PropTypes.string,
    isLoading: PropTypes.bool,
    summonerLevel: PropTypes.number,
    freshBlood: PropTypes.bool,
    veteran: PropTypes.bool,
    hotStreak: PropTypes.bool,
    miniSeries: PropTypes.shape({
      target: PropTypes.number,
      wins: PropTypes.number,
      kills: PropTypes.number,
      deaths: PropTypes.number,
      assists: PropTypes.number,
      doubleKills: PropTypes.number,
      tripleKills: PropTypes.number,
      quadraKills: PropTypes.number,
      pentaKills: PropTypes.number,
      losses: PropTypes.number,
      progress: PropTypes.string,
    }),
    matchHistory: PropTypes.shape({
      matches: PropTypes.arrayOf(PropTypes.shape({
        platformId: PropTypes.string,
        gameId: PropTypes.number,
        champion: PropTypes.string,
        queue: PropTypes.string,
        season: PropTypes.number,
        timestamp: PropTypes.number,
        role: PropTypes.string,
        lane: PropTypes.string,
        championIcon: PropTypes.string,
        win: PropTypes.bool,
        spell1: PropTypes.string,
        spell2: PropTypes.string,
        rune1: PropTypes.string,
        rune2: PropTypes.string,
        gameCreation: PropTypes.string,
        gameDuration: PropTypes.string,
      })),
    }),
  }),
  username: PropTypes.string,
  limit: PropTypes.number,
};

const mapStateToProps = (state) => ({
  profile: state.summonerProfile.profile,
  limit: state.summonerProfile.limit,
});
const mapDispatchToProps = (dispatch) => ({
  showMore: () => dispatch(showMoreMatches()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummonerPage);
