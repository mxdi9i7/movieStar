import React, { Component } from 'react';
import $ from 'jquery'
import axios from 'axios'
require('../css/Search.css')
class Search extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/api/a`).then((data) => {
            this.setState({data: data.data.results})
        })
    }
    
    handleChange(e) {
        const query = e.target.value
        if (e.target.value) {
            axios.get('http://localhost:3001/api/' + query).then((data) => {
                this.setState({data: data.data.results})
            })
        }
    }
    handleSubmit() {
        const query = this.state.queryName
        if (!this.state.queryName) {
            axios.get('http://localhost:3001/api/a' + query).then((data) => {
                this.setState({data: data.data.results, queryName: ""})
            })
        }
        axios.get('http://localhost:3001/api/' + query).then((data) => {
            this.setState({data: data.data.results, queryName: ""})
        })
    }
    render() {
        const resultList = this.state.data;
        const baseUrl = "http://image.tmdb.org/t/p/w185/";
        if (resultList) {
            for (var i =0; i < resultList.length; i++) {
                var self = resultList[i];
                if (self.profile_path == null) {
                    self.full_path = `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
                } else {
                    self.full_path = `${baseUrl}${self.profile_path}`;
                }
                
            }
        }
        return (
            <div className="searchBar">
                <div className="form-group">
                    <label className="text-align-left">Enter a movie star's name:</label>
                    <input className="form-control searchInput" value={this.state.queryName} onChange={this.handleChange} placeholder="Enter a movie star's name here" />
                    <button onClick={this.handleSubmit}>Search</button>
                </div>
                { resultList ? resultList.map((item, index) => (
                        <div className="searchResults" key={index}>
                            <div className="resultItem">
                                <div className="imgContainer">
                                    <img src={item.full_path} alt="" />
                                </div>
                                <h1>Name: {item.name}</h1>
                            </div>
                        </div>
                    )) : <h1>Your search did not return any result, please try a valid name.</h1>
                }
                
            </div>
        );
       
    }
}

export default Search;
