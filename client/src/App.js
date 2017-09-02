import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz'
import Search from './components/Search'
class App extends Component {
  render() {
    return (
		<div className="App">
			<div className="row py-5">
				<div className="col"></div>
				<div className="col align-self-center">
					<Search />
					<Quiz />
				</div>
				<div className="col"></div>
			</div>
			
		</div>
    );
  }
}

export default App;
