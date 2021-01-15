import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Alert from './Alert';
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

const GameOver = ({ finalScore }) => {
  const [nickname, setNickname] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);
  const { alert, showAlert } = useGlobalContext();

  const handleSubmit = e => {
    e.preventDefault();
    if (nickname) {
      const scoreToSubmit = {
        nickname,
        score: finalScore,
      };
      const newHighscores = [...highscores, scoreToSubmit];
      localStorage.setItem('highscores', JSON.stringify(newHighscores));
      setNickname('');
      setSubmitted(true);
    } else {
      showAlert(true, 'Please enter a name', 'danger');
      console.log('no value');
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  if (submitted) {
    return (
      <Redirect
        push
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <>
      <div className="gameover">
        <h1>game over...</h1>
        {alert.show && <Alert />}
        <div className="gameover__final">
          <p>Your final score: </p>
          <h4>{finalScore}</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gameover__form-wrapper">
            <label htmlFor="nickname">Enter your name:</label>
            <input
              type="text"
              name="nickname"
              ref={inputRef}
              onChange={e => setNickname(e.target.value)}
            />
          </div>
          <button type="submit">submit</button>
          <Link to="/">Home</Link>
        </form>
      </div>
    </>
  );
};

export default GameOver;
