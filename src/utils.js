const shuffleArray = (array) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export const shuffleAnswers = (question) => {
  if (!question) {
    return [];
  }
  const unshuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers
  ];
  return shuffleArray(unshuffledAnswers);
};

