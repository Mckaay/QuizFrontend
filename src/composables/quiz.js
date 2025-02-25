import { ref } from "vue";

const state = ref({
  title: "",
  description: "",
  time: "",
  questions: [],
  error: "",
});

export function useQuiz() {
  const addQuestion = () => {
    state.value.questions.push(createQuestion());
  };

  const createAnswer = () => ({ content: "", is_correct: false });

  const createQuestion = (numAnswers = 4) => ({
    content: "",
    answers: Array.from({ length: numAnswers }, createAnswer), // Generate answers dynamically
  });

  const removeQuestion = (index) => {
    state.value.questions.splice(index, 1);
  };

  const isValidQuestions = () => {
    return state.value.questions.every(
      (question) =>
        question.answers.filter((answer) => answer.is_correct).length === 1,
    );
  };

  const resetData = () => {
    state.value = {
      title: "",
      description: "",
      time: "",
      questions: [createQuestion()],
    };
  };

  return {
    state,
    resetData,
    addQuestion,
    removeQuestion,
    createAnswer,
    isValidQuestions,
  };
}
