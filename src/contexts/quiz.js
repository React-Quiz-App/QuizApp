import React, { createContext, useReducer } from 'react';
import questions from '../data';
import { shuffleAnswers, shuffleQuestions } from '../utils';

const initialState = {
  categories: ['CSS', 'Travel'],
  selectedCategory: null,
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  correctAnswerCount: 0,
  scoreCount: 0,
  answers: [],
  currentAnswer: '',
  attemptedNextWithoutAnswer: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION': {
      if (state.currentAnswer === '') {
        return {
          ...state,
          attemptedNextWithoutAnswer: true,
        };
      }
      const attemptedNextWithoutAnswer = false;
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
        attemptedNextWithoutAnswer,
      };
    }
    case 'SELECT_ANSWER': {
      const attemptedNextWithoutAnswer = false;
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
        attemptedNextWithoutAnswer,
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
        attemptedNextWithoutAnswer: false,
      };
    }
    default:
      state;
  }
  return state;
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
