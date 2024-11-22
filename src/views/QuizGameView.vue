<script setup>
import { useRoute } from "vue-router";
import { useQuizStore } from "@/stores/quiz.js";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import ItalicParagraph from "@/components/Text/ItalicParagraph.vue";
import QuizQuestion from "@/components/Quiz/QuizQuestion.vue";
import QuizAnswerButton from "@/components/Quiz/QuizAnswerButton.vue";
import ProgressBar from "@/components/Quiz/ProgressBar.vue";
import ErrorMessage from "@/components/Form/ErrorMessage.vue";
import Quiz from "@/services/quizService.js";
import Result from "@/components/Quiz/Result.vue";
import useQuizGame from "@/composables/quizGame.js";
import { useQuiz } from "@/composables/quizzes.js";

const route = useRoute();
const quizStore = useQuizStore();
const quiz = ref(new Quiz([]));

onBeforeMount(async () => {
  await quizStore.setCurrentQuizData(route.params.id);
  quiz.value = new Quiz(quizStore.currentQuiz);
});

const answeredState = ref(false);
const errorState = ref(false);
const selectedOption = ref(null);
const showResult = ref(false);

const progressBarWidth = computed(() => {
  return ((quiz.value.questionIndex + 1) / quiz.value.totalQuestions) * 100;
});

const buttonText = computed(() => {
  if (answeredState.value && quiz.value.checkIfLastQuestion()) {
    return "Show Result";
  }

  if (answeredState.value) {
    return "Next Question";
  }

  return "Submit Answer";
});

const submitAnswer = () => {
  if (selectedOption.value === null) {
    errorState.value = true;
    return;
  }

  if (quiz.value.checkAnswerByIndex(selectedOption.value)) {
    quiz.value.incrementScore();
  }

  answeredState.value = true;
  errorState.value = false;
};

const goToNextQuestion = () => {
  quiz.value.incrementQuestionIndex();

  if (quiz.value.checkIfQuizShouldEnd()) {
    showResult.value = true;
  }

  answeredState.value = false;
  selectedOption.value = null;
};

const restartGame = () => {
  showResult.value = false;
  quiz.value.restartQuiz();
};
</script>

<template>
  <div v-if="!showResult" class="grid-container">
    <div class="question-wrapper">
      <ItalicParagraph
        :text="`Question ${quiz.questionIndex + 1} of ${quiz.totalQuestions}`"
      />
      <QuizQuestion :text="quiz.currentQuestion" />
      <ProgressBar :width="progressBarWidth" />
    </div>
    <div class="answers-wrapper">
      <QuizAnswerButton
        v-for="(option, index) in quiz.currentOptions"
        :key="index"
        :label="String.fromCharCode(65 + index)"
        :text="option"
        :isCorrect="quiz.checkAnswer(option)"
        :name="'question-' + quiz.questionIndex"
        :value="index"
        :answeredState="answeredState"
        v-model="selectedOption"
      />
      <PrimaryButton
        @click="answeredState ? goToNextQuestion() : submitAnswer()"
        :text="buttonText"
      />
      <ErrorMessage v-if="errorState" message="Please select an answer" />
    </div>
  </div>
  <Result
    @restartGame="restartGame"
    :score="quiz.score"
    :totalQuestions="quiz.totalQuestions"
    :quizIcon="quiz.quizIcon"
    :quizTitle="quiz.quizTitle"
    v-else
  />
</template>

<style scoped>
.grid-container {
  display: grid;

  @media screen and (min-width: 1268px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-200);
    padding-top: var(--spacing-530);
  }
}

.question-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-75);

  @media screen and (min-width: 768px) {
    padding-top: var(--spacing-215);
    gap: var(--spacing-150);
  }

  @media screen and (min-width: 1268px) {
    max-width: 468px;
    padding-top: 0;
    gap: var(--spacing-175);

    .progress-bar {
      margin-top: var(--spacing-600);
    }

    .italic-paragraph {
      margin-top: 0;
    }
  }
}

.answers-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-75);
  padding-top: var(--spacing-250);

  @media screen and (min-width: 768px) {
    gap: var(--spacing-150);
    padding-top: var(--spacing-400);
  }

  @media screen and (min-width: 1268px) {
    max-width: 564px;
    padding-top: 0;
  }
}
</style>
