import React, { Component } from 'react';
import axios from 'axios';

class Searchbar extends Component {
    state = {
        searchText: '',
        searchResults: []
    }

    handleChange = searchText => {
        this.setState({
            searchText: searchText.target.value
        });
    }

    handleSearch = e => {
        e.preventDefault();
        if (this.state.searchText !== '') {
            axios.post('/search', {user: this.state.searchText})
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div>
                <nav className="level">
                    <div className="level-item has-text-centered">
                        <div className="field has-addons">
                            <div className="control"><input className="input" onChange={this.handleChange} type="text" placeholder="Search for a user"></input></div>
                            <div className="control"><button className="button" onClick={this.handleSearch}>Search</button></div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    };
}

export default Searchbar;