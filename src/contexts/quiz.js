import React, { createContext, useReducer } from 'react';
import questions from '../data';
import { shuffleAnswers } from '../utils';

const storedIndex = localStorage.getItem('currentQuestionIndex');
const initialIndex = storedIndex !== null ? parseInt(storedIndex, 10) : 0;

const initialState = {
  categories: ['Art', 'Travel', 'Food', 'General'],
  selectedCategory: null,
  questions: [],
  currentQuestionIndex: initialIndex,
  showResults: false,
  correctAnswerCount: 0,
  scoreCount: 0,
  answers: [],
  currentAnswer: ''
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION': {
      if (state.currentAnswer === '') {
        return {
          ...state
        };
      }
      let questions = state.questions;
      if (!questions || questions.length === 0) {
        questions = JSON.parse(localStorage.getItem('STORED_QUESTIONS'));
      }
      const showResults =
        state.currentQuestionIndex === questions.length - 1;

      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: ''
      };
    }
    case 'SELECT_ANSWER': {
      let questions = state.questions;
      if (!questions || questions.length === 0) {
        questions = JSON.parse(localStorage.getItem('STORED_QUESTIONS'));
      }
      const isCorrect =
        action.payload ===
        questions[state.currentQuestionIndex].correctAnswer;
      const correctAnswerCount = isCorrect
        ? state.correctAnswerCount + 1
        : state.correctAnswerCount;
      const scoreCount = isCorrect ? state.scoreCount + 5 : state.scoreCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswerCount,
        scoreCount
      };
    }
    case 'SELECT_CATEGORY': {
      const selectedCategory = action.payload;
      setLocalStorageItem('SELECTED_CATEGORY', selectedCategory);
      const filteredQuestions = questions.filter(
        (question) => question.category === selectedCategory
      );
      setLocalStorageItem('STORED_QUESTIONS', JSON.stringify(filteredQuestions));
      return {
        ...state,
        selectedCategory,
        questions: filteredQuestions,
        currentQuestionIndex: 0,
        showResults: false,
        correctAnswerCount: 0,
        scoreCount: 0,
        answers: shuffleAnswers(filteredQuestions[0]),
        currentAnswer: ''
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

const setLocalStorageItem = (key, value) => localStorage.setItem(key, value);

