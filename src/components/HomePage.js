import React, { useContext } from 'react';
import { QuizContext } from '../contexts/quiz';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    dispatch({ type: 'SELECT_CATEGORY', payload: category });
    navigate('/quiz');
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <h2>Select a Category:</h2>
      <ul>
        {quizState.categories.map((category) => (
          <div
            className="answer"
            key={category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
