import React, { createContext, useReducer } from 'react';
import questions from '../data';
import { shuffleAnswers, shuffleQuestions } from '../utils';

const initialState = {
  questions: shuffleQuestions(questions),
  currentQuestionIndex: 0,
  showResults: false,
  correctAnswerCount: 0,
  answers: shuffleAnswers(questions[0]),
  currentAnswer: '',
  attemptedNextWithoutAnswer: false,
};
const reducer = (state, action) => {
  console.log('reducer', state, action);
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
    case 'RESTART': {
      return { ...initialState, questions: shuffleQuestions(questions) };
    }
    case 'SELECT_ANSWER': {
      const attemptedNextWithoutAnswer = false;
      const correctAnswerCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswerCount,
        attemptedNextWithoutAnswer,
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
