import { computed, reactive } from "vue";
import { useQuizApi } from "@/composables/quizApi.js";

const quizState = reactive({
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
});

const gameState = reactive({
  error: "",
  currentlyPlaying: false,
  startTimestamp: 0,
  endTimestamp: 0,
  selectedAnswerIndex: -1,
  currentQuestionIndex: 0,
  answeredState: false,
  score: 0,
});

export function useQuizGame() {
  const quizApi = useQuizApi();

  const question = computed(() => {
    if (!quizState.quiz.questions) {
      return {};
    }

    return quizState.quiz.questions[gameState.currentQuestionIndex];
  });

  const answers = computed(() => {
    return quizState.quiz.questions[gameState.currentQuestionIndex].answers;
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
    quizState.quiz = await quizApi.getQuiz(id);
  };

  const selectAnswer = (index) => {
    clearSelectedStateFromAnswers();

    answers.value[index].selected = true;
    gameState.selectedAnswerIndex = index;
  };

  const clearSelectedStateFromAnswers = () => {
    answers.value.forEach((answer) => {
      answer.selected = false;
    });
  };

  const submitAnswer = () => {
    if (gameState.selectedAnswerIndex === -1) {
      gameState.error = "Please select answer";
      return;
    }

    gameState.error = "";
    gameState.answeredState = true;
    if (gameState.selectedAnswerIndex === correctAnswerIndex.value) {
      setStatesOnAnswersWhenCorrectAnswerWasSelected();
      gameState.score++;
      return;
    }

    setStatesOnAnswersWhenWrongAnswerWasSelected();
  };

  const setStatesOnAnswersWhenWrongAnswerWasSelected = () => {
    clearSelectedStateFromAnswers();
    answers.value[gameState.selectedAnswerIndex].state = "wrong";
    answers.value[correctAnswerIndex.value].state = "correct";
  };

  const setStatesOnAnswersWhenCorrectAnswerWasSelected = () => {
    clearSelectedStateFromAnswers();
    answers.value[correctAnswerIndex.value].state = "correct";
  };

  const goToNextQuestion = () => {
    gameState.selectedAnswerIndex = -1;
    gameState.answeredState = false;
    gameState.currentQuestionIndex++;
  };

  const startGame = () => {
    gameState.currentlyPlaying = true;
    gameState.score = 0;
    gameState.currentQuestionIndex = 0;
    gameState.selectedAnswerIndex = -1;
    gameState.answeredState = false;
    gameState.startTimestamp = Date.now();
  };

  const endGame = () => {
    gameState.currentlyPlaying = false;
    gameState.endTimestamp = Date.now();
  };

  return {
    quizState,
    gameState,
    startGame,
    endGame,
    fetchQuizData,
    question,
    answers,
    correctAnswerIndex,
    selectAnswer,
    goToNextQuestion,
    submitAnswer,
  };
}
