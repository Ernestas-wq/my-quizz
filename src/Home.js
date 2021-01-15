import React, { useContext } from 'react';
import { useGlobalContext } from './context';
import { Link } from 'react-router-dom';
const Home = () => {
  const { chooseDifficulty } = useGlobalContext();
  const handleClick = e => {
    const difficulty = e.target.textContent;
    chooseDifficulty(difficulty);
  };
  return (
    <>
      <header className="header">
        <h1>your daily quizz</h1>
        <h3>select difficulty</h3>
        <div className="header__container">
          <Link to="/game" className="header__button" onClick={handleClick}>
            easy
          </Link>
          <Link to="/game" className="header__button" onClick={handleClick}>
            medium
          </Link>
          <Link to="/game" className="header__button" onClick={handleClick}>
            hard
          </Link>
        </div>
      </header>
    </>
  );
};

export default Home;
