import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      searchResults: {
        leagueName: '',
        tier: 'bronze',
        queueType: '',
        rank: 'IV',
        summonerId: '',
        summonerName: '',
        leaguePoints: 0,
        wins: 0,
        losses: 0,
        profileIcon: '',
        tierMedal: '',
      },
      showModal: false,
      isLoading: false,
      loadImages: false,
      error: null,
    };
  }

  // The beefy search engine logic
  handleSearch = () => {
    const { searchText } = this.state;
    if (searchText !== '') {
      this.setState({
        isLoading: true,
        error: false,
      });
      axios.post('/search', { user: searchText })
        .then((response) => {
          const { data } = response;
          if (data !== 'Invalid Summoner!') {
            this.setState({
              searchResults: response.data,
              isLoading: false,
              showModal: true,
              loadImages: true,
            });
          } else {
            this.setState({
              showModal: false,
              isLoading: false,
              error: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Handle search input field text change
  handleChange = (searchText) => {
    this.setState({
      searchText: searchText.target.value,
    });
  }

  // Unshows modal when user clicks on close button
  handleModalExitClick = () => {
    this.setState({
      showModal: false,
    });
  }

  // Handle submit on 'enter' keypress
  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch(e);
    }
  }

  // Reset error state when Searchbar is focused
  handleFocus = () => {
    this.setState({
      error: false,
    });
  }

  render() {
    const {
      isLoading,
      loadImages,
      showModal,
      error,
      searchResults,
    } = this.state;

    return (
      <div>
        <nav className="level">
          <div className="level-item has-text-centered">
            <div className="field has-addons">
              <div className={isLoading ? 'has-icons-left control is-loading' : 'has-icons-left control'}>
                <input className="input" type="text" placeholder="Search for a user" onChange={this.handleChange} onKeyDown={this.handleKeyPress} onFocus={this.handleFocus} />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>
              <div className="control">
                <button type="button" className={error ? 'button tooltip is-tooltip-active is-tooltip-danger' : 'button'} data-tooltip="Invalid Summoner Name!" onClick={this.handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </nav>
        <div className={showModal ? 'modal is-active' : 'modal'}>
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
                            <img className="profilePic-resize" src={loadImages ? searchResults.profileIcon : null} alt="profile icon" />
                            {searchResults.summonerName}
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
                      {searchResults.tier === undefined
                        ? (
                          <div>
                            <figure className="image is-280x280">
                              <img className="medal-resize" alt="ranked logo" src={loadImages ? 'http://opgg-static.akamaized.net/images/medals/default.png' : null} />
                            </figure>
                          </div>
                        )
                        : (
                          <div>
                            <p><strong>{searchResults.leagueName}</strong></p>
                            <figure className="image is-280x280">
                              <img
                                className="medal-resize"
                                alt="ranked logo"
                                src={loadImages ? searchResults.tierMedal : null}
                              />
                            </figure>
                            <p>
                              Tier:
                              {`${searchResults.tier} ${searchResults.rank}`}
                            </p>
                            <p>Queue: Solo/Duo</p>
                            <p>
                              LP:
                              {searchResults.leaguePoints}
                            </p>
                            <p>
                              Wins:
                              {searchResults.wins}
                            </p>
                            <p>
                              Losses:
                              {searchResults.losses}
                            </p>
                          </div>
                        )}
                    </div>
                  )}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Searchbar;
