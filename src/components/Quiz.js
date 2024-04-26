import React, { useContext } from 'react';
import { QuizContext } from '../contexts/quiz';
import Question from './Question';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();

  const handleRestartSameCategory = () => {
    dispatch({ type: 'SELECT_CATEGORY', payload: quizState.selectedCategory });
  };

  return (
    <div className="quiz">
      {quizState.showResults && (
        <Card id="results">
          <Typography level="title-lg" className="congratulations">
            🎊 Congratulations 🎊
          </Typography>
          <div className="results-info">
            <div>You have completed the quiz.</div>
            <div>
              You got {quizState.correctAnswerCount} out of{' '}
              {quizState.questions.length} right.
            </div>
            <div>Score: {quizState.scoreCount}</div>
          </div>
          <div className="next-button" onClick={() => navigate('/')}>
            Main Page
          </div>
          <div className="next-button" onClick={handleRestartSameCategory}>
            Restart
          </div>
        </Card>
      )}
      {!quizState.showResults && (
        <div>
          <div className="score">
            Question: {quizState.currentQuestionIndex + 1} /{' '}
            {quizState.questions.length}
            &nbsp;|&nbsp; Score: {quizState.scoreCount}
          </div>
          <Question />
          {quizState.currentAnswer && (
            <div
              className="next-button"
              onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
            >
              Next question
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
