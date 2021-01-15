import React from 'react';
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

const Highscores = () => {
  const sortedHighscores = highscores.sort((a, b) => b.score - a.score).slice(0, 5);
  console.log(sortedHighscores);

  return (
    <section className="highscores">
      <h1>Highscores </h1>
      <ul className="highscores__list">
        {sortedHighscores.map((player, index) => {
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
