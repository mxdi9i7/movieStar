import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios'
require('../css/Quiz.css')
class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            query: this.props.query,
            version: this.props.version
        }
        this.checkAnswer = this.checkAnswer.bind(this)
    }
    
    componentWillMount() {
        const queryNum = parseInt(this.props.query)
        function getRandomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        function shuffle(array) {
            var copy = [], n = array.length, i;
            while (n) {
            i = Math.floor(Math.random() * n--);
            copy.push(array.splice(i, 1)[0]);
            }
            return copy;
        }
        this.setState({query: queryNum}, () => {
            axios.get(`http://104.131.73.87:3001/api/fetch/person/byId/${this.state.query}`)
            .then((data) => {
                //question that asks about the actor's date of birth
                const dobArray = [data.data.birthday]
                for (var i = 0; i < 3; i++) {
                    const randomYear = getRandomNum(1950,2000)
                    const randomMonth = getRandomNum(1,12)
                    const randomDay = getRandomNum(1,31)
                    dobArray.push(`${randomYear}-${randomMonth}-${randomDay}`)
                }
                //question that asks about the actor's place of birth
                const pobArray = [data.data.place_of_birth]
                var cleanPobArray
                this.setState({data:data.data, }, () => {
                    for (var i=0; i < 10; i++) {
                        axios.get(`http://104.131.73.87:3001/api/fetch/person/byId/${getRandomNum(1,10000)}`)
                        .then((data) => {
                            pobArray.push(data.data.place_of_birth)
                            cleanPobArray = pobArray.filter((item) => {
                                return !!item;
                            }).slice(0, 4)
                            this.setState({dobArray, cleanPobArray, version: this.props.version})
                        })
                    }
                })
            })
        })
    }
    checkAnswer(e) {
        if (this.state.version == "a") {
            if (e.target.innerText == this.state.data.birthday) {
                this.props.history.push(`/result/1/${this.state.data.id}/${this.state.version}`)
            } else {
                this.props.history.push(`/result/0/${this.state.data.id}/${this.state.version}`)
            }
        } else {
            if (e.target.innerText == this.state.data.place_of_birth) {
                this.props.history.push(`/result/1/${this.state.data.id}/${this.state.version}`)
            } else {
                this.props.history.push(`/result/0/${this.state.data.id}/${this.state.version}`)
            }
        }
    }
    render() {
        const actor = this.state.data
        const actorImg = `http://image.tmdb.org/t/p/w185/${actor.profile_path}`
        const dobArray = this.state.dobArray;
        const cleanPobArray = this.state.cleanPobArray;
        const quizVersion = this.state.version;
        return (
            <div className="quizBlock">
                <div className="row">
                    <div className="col-md-4">
                        <div className="imgContainer">
                        {
                            actor.profile_path ? <img src={actorImg} alt={actor.name}/> : <img alt={actor.name} src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
                        }
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-header clearfix">
                            <h1 className="float-left">{actor.name}</h1>
                            <span className="float-right">
                                <Link to="/">Back</Link>
                            </span>
                        </div>
                        <div className="card-body">
                            <div className="row card-details">
                            {
                                quizVersion == "a" ? (
                                <div>
                                    <h1>When was {actor.name} birthday?</h1>
                                    <p>select one answer from below</p>
                                    <div className="row">
                                        {
                                            dobArray ? dobArray.map((question, i) => 
                                            question == dobArray[i] &&
                                            <div key={i} className="col-md-4 col-sm-12 mcChoice" onClick={this.checkAnswer}>
                                                {question}
                                            </div>
                                            ) 
                                            : "Data cannot display"
                                        }
                                    </div>
                                </div>
                                ):(
                                <div>
                                    <h1>Where was {actor.name} born?</h1>
                                    <p>select one answer from below</p>
                                    <div className="row">
                                        {
                                            cleanPobArray ? cleanPobArray.map((question, i) => 
                                            question == cleanPobArray[i] &&
                                            <div key={i} className="col-md-4 col-sm-12 mcChoice" onClick={this.checkAnswer}>
                                                {question}
                                            </div>
                                            ) 
                                            : "Data cannot display"
                                        }
                                    </div>
                                </div>
                                
                            )}
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Quiz;
