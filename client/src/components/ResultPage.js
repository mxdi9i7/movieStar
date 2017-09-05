import React, { Component } from 'react';
import Result from './Result'
class ResultPage extends Component {
    componentDidMount() {
       
    }
    render() {
        return (
            <div className="App">
                    <div className="skewed-bg">
                        <div className="content">
                            <div className="result-content">
                                <Result version={this.props.match.params.version} query={this.props.match.params.query} check={this.props.match.params.check}/>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default ResultPage;



