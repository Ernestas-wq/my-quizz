import React, { useState, useEffect } from 'react';

const htmlDecode = input => {
  let e = document.createElement('textarea');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

const Question = ({ question, answers, correctAnswer, nextQuestion, incrementScore }) => {
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [classToApply, setClassToApply] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const answerIndexes = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
  };
  const handleClick = e => {
    const answerIndex = parseInt(e.target.parentNode.getAttribute('answer_index'));
    setShowNextQuestion(true);
    setIsSelected(true);
    setSelectedAnswer(e.target.parentNode);
    answerIndex === correctAnswer
      ? setClassToApply('game__answer-wrapper--correct')
      : setClassToApply('game__answer-wrapper--incorrect');
  };

  useEffect(() => {
    if (isSelected) {
      selectedAnswer.classList.add(classToApply);
      if (classToApply === 'game__answer-wrapper--correct') incrementScore();
      const timeout = setTimeout(() => {
        selectedAnswer.classList.remove(classToApply);
        setIsSelected(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSelected]);

  useEffect(() => {
    if (showNextQuestion) {
      const timeout = setTimeout(() => {
        nextQuestion();
        setShowNextQuestion(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showNextQuestion]);

  return (
    <>
      {question && (
        <>
          <p className="game__question">{htmlDecode(question)}</p>
          {answers.map((answer, index) => {
            return (
              <div className={`game__answer-wrapper`} key={index} answer_index={index}>
                <div className="game__prefix" onClick={handleClick}>
                  {answerIndexes[index]}
                </div>
                <p onClick={handleClick}>{htmlDecode(answer)}</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Question;
