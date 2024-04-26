import React, { createContext, useReducer } from 'react';
import questions from '../data';
import { shuffleAnswers, shuffleQuestions } from '../utils';

const storedIndex = localStorage.getItem('currentQuestionIndex');
const initialIndex = storedIndex !== null ? parseInt(storedIndex, 10) : 0;

const initialState = {
  categories: ['CSS', 'Travel'],
  selectedCategory: null,
  questions: [],
  currentQuestionIndex: initialIndex,
  showResults: false,
  correctAnswerCount: 0,
  scoreCount: 0,
  answers: [],
  currentAnswer: '',
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION': {
      if (state.currentAnswer === '') {
        return {
          ...state,
        };
      }
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: '',
      };
    }
    case 'SELECT_ANSWER': {
      const isCorrect =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer;
      const correctAnswerCount = isCorrect
        ? state.correctAnswerCount + 1
        : state.correctAnswerCount;
      const scoreCount = isCorrect ? state.scoreCount + 5 : state.scoreCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswerCount,
        scoreCount,
      };
    }
    case 'SELECT_CATEGORY': {
      const selectedCategory = action.payload;
      const filteredQuestions = questions.filter(
        (question) => question.category === selectedCategory
      );
      const shuffledQuestions = shuffleQuestions(filteredQuestions);

      return {
        ...state,
        selectedCategory,
        questions: shuffledQuestions,
        currentQuestionIndex: 0,
        showResults: false,
        correctAnswerCount: 0,
        scoreCount: 0,
        answers: shuffleAnswers(shuffledQuestions[0]),
        currentAnswer: '',
      };
    }
    default:
      return state;
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
