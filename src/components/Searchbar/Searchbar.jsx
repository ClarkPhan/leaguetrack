import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from '../modal/Modal';
import { addSearch, deleteSearch } from '../../redux/actions/searchbar/actionCreators';
import displayModal from '../../redux/actions/modal/actionCreators';

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
      isLoading: false,
      displaySearchHistory: false,
      error: null,
    };
  }

  // The beefy search engine logic
  handleSearch = () => {
    const { searchText } = this.state;
    const { addSearchHistory, showModal } = this.props;
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
              searchResults: data,
              isLoading: false,
            });
            addSearchHistory(searchText.toLowerCase());
            showModal(true);
          } else {
            this.setState({
              error: true,
              isLoading: false,
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

  // Handle submit on 'enter' keypress
  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch(e);
    }
  }

  // Reset error state when Searchbar is focused
  handleFocus = () => {
    this.setState({
      displaySearchHistory: true,
      error: false,
    });
  }

  // Close search history drop down on unfocus
  handleUnfocus = () => {
    this.setState({
      displaySearchHistory: false,
    });
  }

  generateSearchHistory = (searchHistory) => {
    const { removeSearchHistory } = this.props;
    const searches = searchHistory.map((search) => (
      <div id={search} className="control">
        <div className="tags has-addons">
          <button type="button" className="tag is-link is-capitalized link-button">{search}</button>
          {/* <a role="button" className="tag is-link is-capitalized">{search}</a> */}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="tag is-delete link-button"
            onClick={() => {
              const elm = document.getElementById(search);
              removeSearchHistory(search);
              elm.remove();
            }}
          />
        </div>
      </div>
    ));

    return (
      <div className="field is-grouped is-grouped-multiline">
        {searches}
      </div>
    );
  }

  render() {
    const {
      isLoading,
      error,
      searchResults,
      displaySearchHistory,
    } = this.state;

    const { searchHistory } = this.props;

    return (
      <div>
        <nav className="level">
          <div className="level-item has-text-centered">
            <div className={`${searchHistory.length > 0 && displaySearchHistory ? 'is-active' : ''} is-active dropdown field has-addons`}>
              <div className="dropdown-trigger">
                <div className={isLoading ? 'has-icons-left control is-loading' : 'has-icons-left control'}>
                  <input className="input is-medium" type="text" placeholder="Search for a user" onChange={this.handleChange} onKeyDown={this.handleKeyPress} onFocus={this.handleFocus} onBlur={this.handleUnfocus} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </div>
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-content has-text-left">
                  <div className="dropdown-item">
                    <h6 className="title is-6">Recent Searches</h6>
                  </div>
                  <div className="dropdown-item">
                    {this.generateSearchHistory(searchHistory)}
                  </div>
                </div>
              </div>
              <div className="control">
                <button type="button" className={error ? 'button tooltip is-tooltip-active is-tooltip-danger is-medium' : 'button is-medium'} data-tooltip="Invalid Summoner Name!" onClick={this.handleSearch}>
                  <span>
                    <i className="fas fa-search" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <Modal summonerData={searchResults} isLoading={isLoading} />
      </div>
    );
  }
}

Searchbar.defaultProps = {
  searchHistory: [],
};

Searchbar.propTypes = {
  addSearchHistory: PropTypes.func.isRequired,
  removeSearchHistory: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  searchHistory: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])),
};

const mapStateToProps = (state) => ({ searchHistory: state.searchbar.searches });
const mapDispatchToProps = (dispatch) => ({
  addSearchHistory: (search) => dispatch(addSearch(search)),
  removeSearchHistory: (search) => dispatch(deleteSearch(search)),
  showModal: (payload) => dispatch(displayModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
