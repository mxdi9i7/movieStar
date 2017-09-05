import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import './App.css';
import SearchPage from './components/SearchPage'
import QuizPage from './components/QuizPage'
import ResultPage from './components/ResultPage'

class App extends Component {
  render() {
    return (
			<Router history={createHistory}>
				<div>
					<Route exact path="/" component={SearchPage} />
					<Route path="/quiz/:query/:version" component={QuizPage}/>
					<Route path="/result/:check/:query/:version" history={createHistory} component={ResultPage} />
				</div>
			</Router>
    );
  }
}

export default App;
