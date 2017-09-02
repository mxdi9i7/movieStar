import React, { Component } from 'react';
import $ from 'jquery'
import axios from 'axios'
require('../css/Search.css')
class Search extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/api/james`).then((data) => {
            this.setState({data: data.data.results})
        })
    }
    render() {
        console.log(this.state.data)
        const resultList = this.state.data;
        const baseUrl = "http://image.tmdb.org/t/p/w185/";
        for (var i =0; i < resultList.length; i++) {
            var self = resultList[i];
            self.full_path = `${baseUrl}${self.profile_path}`
        }
        console.log(resultList)
        return (
            <div className="searchBar">
                <div className="form-group">
                    <label className="text-align-left">Enter a movie star's name:</label>
                    <input className="form-control searchInput"  placeholder="Enter a movie star's name here" />
                </div>
                { resultList.map((item, index) => (
                        
                        <div className="searchResults" key={index}>
                            <div className="resultItem">
                                <div className="imgContainer">
                                    <img src={item.full_path} alt="" />
                                </div>
                                <h1>Name: {item.name}</h1>
                                <p>Most Famous For: {item.known_for[1].title}, {item.known_for[1].release_date}</p>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        );
    }
}

export default Search;
