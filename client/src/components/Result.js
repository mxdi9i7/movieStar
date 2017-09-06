import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
require('../css/Result.css')
class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: this.props.check,
            query: this.props.query,
            version: this.props.version
        }
    }
    componentWillMount() {
        axios.get(`http://localhost:3001/api/fetch/person/byId/${Number(this.state.query)}`)
        .then((data) => {
            this.setState({data: data.data})
        })
    }
    render() {
        const actor = this.state.data
        const versionA = "a";
        const versionB = "b";
        return (
            <div className="resultBlock">
                {
                    this.state.check == 1 ? (
                        this.state.version == versionA ? (
                            <div>
                                <h1>Congratulations, You got it right!</h1>
                                <p>You may go back to the home page or answer another question about {
                                    actor ? actor.name : "this person"
                                    }.</p>
                                <div className="clearfix">
                                    <div className="float-left">
                                        <Link to={{pathname: '/'}} className="btn leftBtn btn-danger">
                                            Back to home page
                                        </Link>
                                    </div>
                                    <div className="float-right">
                                        <Link className="btn rightBtn btn-success" to={{pathname: `/quiz/${this.state.query}/${this.state.version == versionA ? versionB : versionA}`}} >
                                            Play another game
                                        </Link>
                                    </div>
                                </div>
                            </div> 
                        ) : (
                            <div>
                                <h1>Congratulations, You got it right!</h1>
                                <p>You may go back to the home page and answer questions about other Hollywood stars.</p>
                                <div>
                                    <Link to={{pathname: '/'}} className="btn btn-danger">
                                        Back to home page
                                    </Link>
                                </div>
                            </div> 
                        )
                    
                    ): (
                    <div>
                        <h1>Oooops, You got it wrong.</h1>
                        <p>You may go back to the home page or try again.</p>
                        <div>
                                <Link to={{pathname: '/'}} className="btn leftBtn btn-danger">
                                    Back to home page
                                </Link>
                                <Link className="btn rightBtn btn-success" to={{pathname: `/quiz/${this.state.query}/${this.state.version == versionA ? versionA : versionB}`}} >
                                    Play again
                                </Link>
                        </div>
                    </div>
                )}
                
            </div>
        );
    }
}

export default Result;
