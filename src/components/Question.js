import React, { useContext } from 'react';
import { QuizContext } from '../contexts/quiz';
import Answer from './Answer';

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  let currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  if (!currentQuestion) {
    let questions = JSON.parse(localStorage.getItem('STORED_QUESTIONS'));
    currentQuestion = questions[quizState.currentQuestionIndex];
  }
  let answers = quizState.answers;
  if (!answers || answers.length === 0) {
    answers = currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer);
  }
  return (
    <div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {answers.map((answer, index) => (
          <Answer
            answerText={answer}
            key={index}
            index={index}
            currentAnswer={quizState.currentAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelectAnswer={(answerText) =>
              dispatch({ type: 'SELECT_ANSWER', payload: answerText })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
