import { reactive, computed } from "vue";

export default function useQuizGame(data) {
  const state = reactive({
    quizData: data ?? [],
    questionIndex: 0,
    score: 0,
  });

  const questions = computed(() => state.quizData.questions ?? []);
  const quizTitle = computed(() => state.quizData.title ?? "");
  const quizIcon = computed(() => state.quizData.icon ?? "");

  const currentQuestion = computed(
    () => questions.value[state.questionIndex]?.content,
  );
  const currentOptions = computed(
    () => questions.value[state.questionIndex]?.answers,
  );
  const totalQuestions = computed(() => questions.value.length ?? 0);

  const correctAnswerIndex = computed(() =>
    questions.value[state.questionIndex]?.answers.findIndex(
      (answer) => answer.is_correct,
    ),
  );

  const incrementScore = () => {
    state.score++;
  };

  const incrementQuestionIndex = () => {
    state.questionIndex++;
  };

  const checkAnswer = (answer) => {
    return answer.is_correct;
  };

  const checkAnswerByIndex = (index) => {
    return index === correctAnswerIndex.value;
  };

  const checkIfQuizShouldEnd = computed(() => {
    return state.questionIndex >= totalQuestions.value ?? false;
  });

  const checkIfLastQuestion = computed(() => {
    return state.questionIndex === totalQuestions.value - 1;
  });

  const restartQuiz = () => {
    state.questionIndex = 0;
    state.score = 0;
  };

  return {
    state,
    quizTitle,
    quizIcon,
    currentQuestion,
    currentOptions,
    totalQuestions,
    correctAnswerIndex,
    incrementScore,
    incrementQuestionIndex,
    checkAnswer,
    checkAnswerByIndex,
    checkIfQuizShouldEnd,
    checkIfLastQuestion,
    restartQuiz,
  };
}
