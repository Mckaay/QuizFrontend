import { computed, reactive } from "vue";
import { useQuizApi } from "@/composables/quizApi.js";

const state = reactive({
  quiz: {
    title: "",
    description: "",
    time: 0,
    numberOfQuestions: 0,
    questions: [
      {
        content: "",
        answers: [
          {
            content: "",
            is_correct: false,
          },
        ],
      },
    ],
  },
  selectedAnswerIndex: -1,
  currentQuestionIndex: 0,
  answeredState: false,
  score: 0,
});

export function useQuizGame() {
  const quizApi = useQuizApi();

  const question = computed(() => {
    if (!state.quiz.questions) {
      return {};
    }

    return state.quiz.questions[state.currentQuestionIndex];
  });

  const answers = computed(() => {
    return state.quiz.questions[state.currentQuestionIndex].answers;
  });

  const correctAnswerIndex = computed(() => {
    let index = 0;
    answers.value.forEach((answer, answerIndex) => {
      if (answer.is_correct) {
        index = answerIndex;
      }
    });

    return index;
  });

  const fetchQuizData = async (id) => {
    state.quiz = await quizApi.getQuiz(id);
  };

  const selectAnswer = (index) => {
    answers.value.forEach((answer) => {
      answer.selected = false;
    });

    answers.value[index].selected = true;
    state.selectedAnswerIndex = index;
  };

  const submitAnswer = () => {
    if (state.selectedAnswerIndex === correctAnswerIndex.value) {
      answers.value[state.selectedAnswerIndex].selected = false;
      answers.value[correctAnswerIndex.value].state = "correct";
      state.score++;
      state.answeredState = true;
      return;
    }

    state.answeredState = true;
    answers.value[state.selectedAnswerIndex].selected = false;
    answers.value[state.selectedAnswerIndex].state = "wrong";
    answers.value[correctAnswerIndex.value].state = "correct";
  };

  const goToNextQuestion = () => {
    state.answeredState = false;
    state.currentQuestionIndex++;
  };

  return {
    state,
    fetchQuizData,
    question,
    answers,
    correctAnswerIndex,
    selectAnswer,
    goToNextQuestion,
    submitAnswer,
  };
}
