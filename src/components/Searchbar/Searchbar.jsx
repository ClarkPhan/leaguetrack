import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from '../modal/Modal';
import { addSearch } from '../../redux/actions/searchbar/actionCreators';
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
            addSearchHistory(searchText);
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
      error: false,
    });
  }

  render() {
    const {
      isLoading,
      error,
      searchResults,
    } = this.state;

    return (
      <div>
        <nav className="level">
          <div className="level-item has-text-centered">
            <div className="field has-addons">
              <div className={isLoading ? 'has-icons-left control is-loading' : 'has-icons-left control'}>
                <input className="input is-medium" type="text" placeholder="Search for a user" onChange={this.handleChange} onKeyDown={this.handleKeyPress} onFocus={this.handleFocus} />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
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
  showModal: PropTypes.func.isRequired,
  searchHistory: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => ({ searchHistory: state.searchbar.searches });
const mapDispatchToProps = (dispatch) => ({
  addSearchHistory: (search) => dispatch(addSearch(search)),
  showModal: (payload) => dispatch(displayModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
