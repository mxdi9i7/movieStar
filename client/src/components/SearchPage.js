import React, { Component } from 'react';
import Search from './Search';
class SearchPage extends Component {
    componentDidMount() {
       
    }
    render() {
        return (
            <div className="App">
                    <div className="skewed-bg">
                        <div className="content">
                            <div className="search-content">
                                <Search />
                            </div>
                        </div>
                    </div>
                    <p className="copyright">Designed and Developed by Peter Zheng</p>
            </div>
        );
    }
}

export default SearchPage;



