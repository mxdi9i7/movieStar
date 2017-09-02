import React, { Component } from 'react';
import $ from 'jquery'
class Search extends Component {
    componentDidMount() {
       
    }
    render() {
        return (
            <div className="searchBar">
                <div className="form-group">
                    <label className="text-align-left">Enter a movie star's name:</label>
                    <input className="form-control" placeholder="Enter a movie star's name here" />
                </div>
            </div>
        );
    }
}

export default Search;
