import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayModal from '../../redux/actions/modal/actionCreators';

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      loadImages: true,
    };
  }

  // Unshows modal when user clicks on close button
  handleModalExitClick = () => {
    const { showModal } = this.props;
    showModal(false);
  }

  render() {
    const { loadImages } = this.state;
    const { summonerData, isActive, isLoading } = this.props;
    return (
      <div className={isActive ? 'modal is-active' : 'modal'}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="modal-card">
            <header className="modal-card-head">
              <div className="modal-card-title has-text-centered">
                {isLoading ? <div className="has-text-centered">Loading...</div>
                  : (
                    <div>
                      <div className="level">
                        <div className="level-item">
                          <img className="profilePic-resize" src={loadImages ? summonerData.profileIcon : null} alt="profile icon" />
                          {summonerData.summonerName}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <button type="button" className="delete" aria-label="close" onClick={this.handleModalExitClick} />
            </header>
            <section className="modal-card-body">
              {isLoading ? <div className="has-text-centered"><FontAwesomeIcon icon="spinner" pulse size="6x" /></div>
                : (
                  <div className="has-text-centered">
                    {summonerData.tier === undefined
                      ? (
                        <div>
                          <figure className="image is-280x280">
                            <img className="medal-resize" alt="ranked logo" src={loadImages ? 'http://opgg-static.akamaized.net/images/medals/default.png' : null} />
                          </figure>
                        </div>
                      )
                      : (
                        <div>
                          <p><strong>{summonerData.leagueName}</strong></p>
                          <figure className="image is-280x280">
                            <img
                              className="medal-resize"
                              alt="ranked logo"
                              src={loadImages ? summonerData.tierMedal : null}
                            />
                          </figure>
                          <p>
                            Tier:
                            {`${summonerData.tier} ${summonerData.rank}`}
                          </p>
                          <p>Queue: Solo/Duo</p>
                          <p>
                            LP:
                            {summonerData.leaguePoints}
                          </p>
                          <p>
                            Wins:
                            {summonerData.wins}
                          </p>
                          <p>
                            Losses:
                            {summonerData.losses}
                          </p>
                        </div>
                      )}
                  </div>
                )}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  summonerData: {},
  isActive: false,
  isLoading: false,
};

Modal.propTypes = {
  summonerData: PropTypes.shape({
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
  }),
  showModal: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({ isActive: state.modal.displayModal });
const mapDispatchToProps = (dispatch) => ({
  showModal: (payload) => dispatch(displayModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
