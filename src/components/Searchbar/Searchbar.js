import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Searchbar extends Component {
    state = {
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
            tierMedal: ''
        },
        showModal: false,
        isLoading: false,
        loadImages: false,
        error: null
    }

    handleChange = searchText => {
        this.setState({
            searchText: searchText.target.value
        });
    }

    handleSearch = e => {
        e.preventDefault();
        if (this.state.searchText !== '') {
            this.setState({
                isLoading: true,
                showModal: true
            });
            axios.post('/search', { user: this.state.searchText })
                .then(response => {
                    console.log(response.data);
                    if (response.data !== "bad request") {
                        this.setState({
                            searchResults: response.data,
                            isLoading: false,
                            loadImages: true
                        })
                    } else {
                        this.setState({
                            showModal: false
                        });
                        // show client bad request ui
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleModalExitClick = e => {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }

    handleKeyPress = e => {
        if (e.keyCode === 13) {
            this.handleSearch(e)
        }
    }

    render() {
        const { isLoading, loadImages, showModal, error, searchResults } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div>
                <nav className="level">
                    <div className="level-item has-text-centered">
                        <div className="field has-addons" >
                            <div className="control"><input className="input" type="text" placeholder="Search for a user" onChange={this.handleChange} onKeyDown={this.handleKeyPress}></input></div>
                            <div className="control">
                                <button className="button" onClick={this.handleSearch}>Search</button>
                                <button className="region-button"> NA</button>
                            </div>
                        </div>
                    </div>
                </nav>

                {isLoading ? <p className="has-text-centered">Loading...</p> : null}

                <div className={showModal ? "modal is-active" : "modal"}>
                    <div className="modal-background"></div>
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
                                        )
                                    }
                                </div>
                                <button className="delete" aria-label="close" onClick={this.handleModalExitClick}></button>
                            </header>
                            <section className="modal-card-body">
                                {isLoading ? <div className="has-text-centered"><FontAwesomeIcon icon="spinner" pulse={true} size="6x" /></div>
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
                                                        <figure className="image is-280x280"><img className="medal-resize" alt="ranked logo"
                                                            src={loadImages ? searchResults.tierMedal : null} />
                                                        </figure>
                                                        <p>Tier: {searchResults.tier + ' ' + searchResults.rank}</p>
                                                        <p>Queue: Solo/Duo</p>
                                                        <p>LP: {searchResults.leaguePoints}</p>
                                                        <p>Wins: {searchResults.wins}</p>
                                                        <p>Losses: {searchResults.losses}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Searchbar;