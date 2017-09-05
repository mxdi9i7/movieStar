import React, { Component } from 'react';
import Quiz from './Quiz';
class QuizPage extends Component {

    componentDidMount() {
        
    }
    render() {
        return (
            <div className="App">
                    <div className="skewed-bg">
                        <div className="content">
                            <div className="quiz-content">
                                <Quiz version={this.props.match.params.version} query={this.props.match.params.query} history={this.props.history}/>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default QuizPage;



