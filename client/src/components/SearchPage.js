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
                            <div className="quiz-content">
                                <Search />
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default SearchPage;



