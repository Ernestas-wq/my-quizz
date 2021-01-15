import React, { useEffect, useState } from 'react';
// const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

const getLocalStorage = () => {
  let highscores = localStorage.getItem('highscores');
  return highscores ? JSON.parse(highscores) : [];
};

const Highscores = () => {
  const [highscores, setHighscores] = useState(getLocalStorage());
  const sortedHighscores = highscores.sort((a, b) => b.score - a.score).slice(0, 5);
  useEffect(() => {
    const newHighscores = highscores.sort((a, b) => b.score - a.score).slice(0, 5);
    setHighscores(newHighscores);
  }, [highscores]);

  console.log(sortedHighscores);

  return (
    <section className="highscores">
      <h1>Highscores </h1>
      <ul className="highscores__list">
        {highscores.map((player, index) => {
          return (
            <li key={index}>
              <p>
                {index + 1}.{player.nickname}
                <span>{player.score}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Highscores;
