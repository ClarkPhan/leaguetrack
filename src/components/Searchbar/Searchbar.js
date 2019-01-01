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
            profileIconId: 0
        },
        showModal: false,
        isLoading: false,
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
            this.setState({ isLoading: true });
            this.setState({ showModal: true });
            console.log("search");
            axios.post('/search', { user: this.state.searchText })
                .then(response => {
                    console.log(response.data);
                    if (response.data !== "bad request") {
                        this.setState({
                            searchResults: response.data,
                            isLoading: false
                        })
                    } else {
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

    romanToInt = num => {
        let roman = ["I", "II", "III", "IV"];
        let value = ["1", "2", "3", "4"];
        for (let i = 0; i < roman.length; i++) {
            if (roman[i] === num) {
                return value[i].toString();
            }
        }
        return "error";
    }

    render() {
        const { isLoading, showModal, error, searchResults } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div>
                <nav className="level">
                    <div className="level-item has-text-centered">
                        <div className="field has-addons" >
                            <div className="control"><input className="input" type="text" placeholder="Search for a user" onChange={this.handleChange} onKeyDown={this.handleKeyPress}></input></div>
                            <div className="control"><button className="button" onClick={this.handleSearch}>Search</button></div>
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
                                                        <img className="profilePic-resize" src={`http://opgg-static.akamaized.net/images/profile_icons/profileIcon${searchResults.profileIconId}.jpg`} alt="profile icon" />
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
                                            <p><strong>{searchResults.leagueName}</strong></p>
                                            <figure className="image is-280x280"><img className="medal-resize" src={`http://opgg-static.akamaized.net/images/medals/${searchResults.tier.toLowerCase()}_${this.romanToInt(searchResults.rank)}.png`} alt="ranked logo" /></figure>
                                            <p>Tier: {searchResults.tier + ' ' + searchResults.rank}</p>
                                            <p>Queue: {searchResults.queueType === "RANKED_SOLO_5x5" ? "Solo/Duo" : "Flex"}</p>
                                            <p>LP: {searchResults.leaguePoints}</p>
                                            <p>Wins: {searchResults.wins}</p>
                                            <p>Losses: {searchResults.losses}</p>
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