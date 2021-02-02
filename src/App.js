import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Game from './game-logic';
import Highscores from './Highscores';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/highscores">
            <Highscores />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
