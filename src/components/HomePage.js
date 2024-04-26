import React, { useContext } from 'react';
import { QuizContext } from '../contexts/quiz';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';

const HomePage = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    dispatch({ type: 'SELECT_CATEGORY', payload: category });
    navigate('/quiz');
  };

  const categoryImages = {
    CSS: '/favicon.ico',
    Travel: '/travel.jpg',
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <h2>Select a Category:</h2>
      <div className="categories">
        {quizState.categories.map((category) => (
          <Card key={category} id="category-card">
            <CardMedia id="category-img" image={categoryImages[category]} />
            <CardContent>
              <Typography variant="h5" className="card-text">
                {category}
              </Typography>
            </CardContent>
            <CardContent>
              <Button
                id="basic-button"
                onClick={() => handleCategorySelect(category)}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
