import React, { useState, useEffect } from 'react';
import Question from './Question';
import Loading from '../Loading';
import GameOver from './GameOver';
import { useGlobalContext } from '../context';

let url = 'https://opentdb.com/api.php?amount=10&type=multiple';

const Game = () => {
  const { gameDifficulty } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  url += `&difficulty=${gameDifficulty}`;

  const fetchQuestions = async () => {
    setLoading(true);
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    const formattedQuestions = result.results.map((qst, index) => {
      const { correct_answer, incorrect_answers, question } = qst;
      return {
        correct_answer: correct_answer,
        incorrect_answers: incorrect_answers,
        question: question,
        id: index,
      };
    });
    const formattedQuestion = getFormattedQuestion(formattedQuestions);
    setQuestions(formattedQuestions);
    setQuestion(formattedQuestion);
    setLoading(false);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (currentQuestionIndex === 11) {
      setGameOver(true);
      setFinalScore(score);
      setQuestions([]);
      setScore(0);
      setQuestion({});
      setCurrentQuestionIndex(1);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (showNextQuestion && !gameOver) {
      const newQuestions = questions.filter(qst => qst.id !== question.id);
      const newQuestion = getFormattedQuestion(newQuestions);
      setQuestions(newQuestions);
      setQuestion(newQuestion);
      setShowNextQuestion(false);
    }
  }, [showNextQuestion]);

  const getFormattedQuestion = arr => {
    const correctAnswer = Math.floor(Math.random() * 4);
    const answers = [...arr[0].incorrect_answers];
    answers.splice(correctAnswer, 0, arr[0].correct_answer);
    const question = arr[0].question;
    const id = arr[0].id;
    return { answers, question, correctAnswer, id };
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < 10) {
      setShowNextQuestion(true);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const incrementScore = () => {
    setScore(score + 10);
  };

  if (loading) return <Loading />;
  if (!gameOver)
    return (
      <section className="game">
        <div className="game__UI">
          <div className="game__score">
            <p>{score}</p>
          </div>
          <div className="game__tracker">
            <p>{currentQuestionIndex}/10</p>
          </div>
        </div>
        {question && (
          <Question {...question} nextQuestion={nextQuestion} incrementScore={incrementScore} />
        )}
      </section>
    );
  else return <GameOver finalScore={finalScore} />;
};

export default Game;
