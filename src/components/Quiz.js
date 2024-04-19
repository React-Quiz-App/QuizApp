import React, { useContext } from 'react';
import { QuizContext } from '../contexts/quiz';
import Question from './Question';
import { useNavigate } from 'react-router-dom';
const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();
  return (
    <div className="quiz">
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congratulations!</div>
          <div className="results-info">
            <div>You have completed the quiz.</div>
            <div>
              You got {quizState.correctAnswerCount} out of{' '}
              {quizState.questions.length} right.
            </div>
            <div>Score: {quizState.scoreCount}</div>
            <div className="next-button" onClick={() => navigate('/')}>
              Restart
            </div>
          </div>
        </div>
      )}
      {!quizState.showResults && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1} /{' '}
            {quizState.questions.length}
            &nbsp;|&nbsp; Score: {quizState.scoreCount}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
          >
            Next question
          </div>
        </div>
      )}
      {quizState.attemptedNextWithoutAnswer && (
        <div className="message">
          Please select an answer before moving to the next question.
        </div>
      )}
    </div>
  );
};

export default Quiz;
