import React, { Component } from 'react';
// import $ from 'jquery'
import axios from 'axios'
import { Link } from 'react-router-dom';
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
        axios.get(`http://localhost:3001/api/fetch/people/byName/peter`).then((data) => {
            this.setState({data: data.data.results})
        })
    }
    
    handleChange(e) {
        const query = e.target.value
        if (e.target.value) {
            axios.get('http://localhost:3001/api/fetch/people/byName/' + query).then((data) => {
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
        axios.get('http://localhost:3001/api/fetch/people/byName/' + query).then((data) => {
            this.setState({data: data.data.results, queryName: ""})
        })
    }
    render() {
        var resultList = this.state.data;
        const baseUrl = "http://image.tmdb.org/t/p/w185/";
        if (resultList) {
            for (var i =0; i < resultList.length; i++) {
                var self = resultList[i];
                if (self.profile_path == null) {
                    self.full_path = `https://goo.gl/EHMUZZ`
                } else {
                    self.full_path = `${baseUrl}${self.profile_path}`;
                }
            }
            
        }
        return (
            <div className="searchBar">
                <div className="card-header">
                    <h1>Search for your favorite movie star</h1>
                </div>
                <div className="form-group">
                    <input className="form-control searchInput" value={this.state.queryName} onChange={this.handleChange} placeholder="Enter a movie star's name here" />
                    {/* <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button> */}
                </div>
                <div className="searchResult row">
                    { resultList ? resultList.map((item, index) => (
                        <Link className="col-md-3 col-sm-4 col-6" to={{ pathname: '/quiz/' + item.id + '/a'}} key={index}>
                            <div className="resultItem">
                                <div className="imgContainer">
                                    <img src={item.full_path} alt="" />
                                    <h1>{item.name}</h1>
                                </div>
                                
                            </div>
                        </Link>
                        )) : <h1>Your search did not return any result, please try a valid name.</h1>
                    }
                </div>
            </div>
        );
       
    }
}

export default Search;
