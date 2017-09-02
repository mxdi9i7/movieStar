import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz'
import Search from './components/Search'
class App extends Component {
  render() {
    return (
		<div className="App">
				<div className="quiz-content">
					<Search />
					<Quiz />
				</div>
			
		</div>
    );
  }
}

export default App;
