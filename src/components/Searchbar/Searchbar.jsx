import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { addSearch, deleteSearch } from '../../redux/actions/searchbar/actionCreators';
import { createProfile } from '../../redux/actions/summonerProfile/actionCreators';

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      isLoading: false,
      displaySearchHistory: false,
      error: null,
      redirectURL: null,
    };
  }

  // The beefy search engine logic
  requestSearchData = (user) => {
    const {
      searchHistory,
      addSearchHistory,
      updateSummonerData,
      enableRedirect,
      history,
    } = this.props;

    this.setState({
      isLoading: true,
      error: false,
    });

    // Request search results from server
    axios.post('/search', { user })
      .then((response) => {
        const { data } = response;
        if (data !== 'Invalid Summoner!') {
          this.setState({
            isLoading: false,
            displaySearchHistory: false,
          });
          if (!searchHistory.includes(user)) {
            addSearchHistory(user.toLowerCase());
          }
          // Trigger modal
          // showModal(true);
          updateSummonerData(data);
          if (!enableRedirect) {
            console.log(history);
            // eslint-disable-next-line react/prop-types
            history.push(`/summoner/${user}`);
          } else {
            this.setState({ redirectURL: `/summoner/${user}` });
          }
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

  // Handle search button onClick event
  handleSearch = () => {
    const { searchText } = this.state;
    if (searchText !== '') {
      this.requestSearchData(searchText);
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
  handleUnfocus = (e) => {
    // Does not unfocus on relate elements
    if (e.relatedTarget) {
      const { className } = e.relatedTarget;
      if (className === 'tag is-delete link-button' || className === 'tag is-link is-capitalized link-button') {
        return;
      }
    }
    this.setState({
      displaySearchHistory: false,
    });
  }

  generateSearchHistory = (searchHistory) => {
    const { removeSearchHistory } = this.props;
    if (searchHistory.length > 0) {
      const searches = searchHistory.map((user) => (
        <div id={user} key={user} className="control">
          <div className="tags has-addons">
            <button
              type="button"
              className="tag is-link is-capitalized link-button"
              onClick={() => {
                this.requestSearchData(user);
              }}
            >
              {user}
            </button>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="tag is-delete link-button"
              onClick={() => {
                removeSearchHistory(user);
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
    return null;
  }

  render() {
    const {
      isLoading,
      error,
      displaySearchHistory,
      redirectURL,
    } = this.state;
    const { searchHistory, enableRedirect, position } = this.props;
    console.log(position);
    if (enableRedirect && redirectURL) {
      return <Redirect to={redirectURL} />;
    }
    return (
      <div>
        <nav className="level">
          <div className="level-item has-text-centered">
            <div className={`${searchHistory.length > 0 && displaySearchHistory ? 'is-active' : ''} dropdown field has-addons`}>
              <div className="dropdown-trigger">
                <div className={`${isLoading ? 'is-loading' : ''} has-icons-left control`}>
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Search for a user"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyPress}
                    onFocus={this.handleFocus}
                    onBlur={this.handleUnfocus}
                  />
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
                <button
                  type="button"
                  className={`${error ? 'has-tooltip-danger has-tooltip-arrow has-tooltip-active' : null}
                              ${error && position === 'right' ? 'has-tooltip-right' : null}
                              button is-medium`}
                  data-tooltip={error ? 'Invalid Summoner Name!' : null}
                  onClick={this.handleSearch}
                >
                  <span><i className="fas fa-search" /></span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        {/* <Modal summonerData={searchResults} isLoading={isLoading} /> */}
      </div>
    );
  }
}

Searchbar.defaultProps = {
  searchHistory: [],
  enableRedirect: true,
};

Searchbar.propTypes = {
  addSearchHistory: PropTypes.func.isRequired,
  removeSearchHistory: PropTypes.func.isRequired,
  updateSummonerData: PropTypes.func.isRequired,
  searchHistory: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])),
  enableRedirect: PropTypes.bool,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({ searchHistory: state.searchbar.searches });

const mapDispatchToProps = (dispatch) => ({
  addSearchHistory: (search) => dispatch(addSearch(search)),
  removeSearchHistory: (search) => dispatch(deleteSearch(search)),
  updateSummonerData: (data) => dispatch(createProfile(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searchbar));
