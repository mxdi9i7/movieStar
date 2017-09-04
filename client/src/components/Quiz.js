import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
require('../css/Quiz.css')
class Quiz extends Component {
    constructor() {
        super()
        this.state = {
            data: {}
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
            axios.get(`http://localhost:3001/api/fetch/person/byId/${this.state.query}`)
            .then((data) => {
                const mcArray = [data.data.birthday]
                for (var i = 0; i < 3; i++) {
                    const randomYear = getRandomNum(1950,2000)
                    const randomMonth = getRandomNum(1,12)
                    const randomDay = getRandomNum(1,31)
                    mcArray.push(`${randomYear}-${randomMonth}-${randomDay}`)
                }
                this.setState({data:data.data, arr: mcArray}, () => {
                    console.log(this.state)
                })
            })
        })
    }
    checkAnswer(e) {
        console.log(e.target.innerText)
    }
    render() {
        const actor = this.state.data
        const actorImg = `http://image.tmdb.org/t/p/w185/${actor.profile_path}`
        const arr = this.state.arr;
        
        return (
            <div className="quizBlock">
                <span><Link to="/">Back</Link></span>
                <div className="row">
                    <div className="actorBlock col">
                        <div className="imgContainer">
                        {
                            actor.profile_path ? <img src={actorImg} alt={actor.name}/> : <img alt={actor.name} src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
                        }
                        </div>
                        <h1 className="actorName">{actor.name}</h1>
                    </div>
                    <div className="quizContent col">
                        <h2>What was his birthday?</h2>
                        {
                            arr ? arr.map((question, i) => 
                                <div key={i} className="mcChoice">
                                    {i+1}. <span onClick={this.checkAnswer}>{question}</span>
                                </div>
                            ) : "Data cannot display"
                        }
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Quiz;
