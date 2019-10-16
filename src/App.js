import React, { Component } from 'react';
import Game from './containers/Game'
import Home from './containers/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
class App extends Component {


  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/game" component={Game}/>
      </Switch>
      </div>
    );
  }

}

export default App;
