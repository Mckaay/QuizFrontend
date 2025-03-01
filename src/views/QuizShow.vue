<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import BaseProgressBar from "@/components/shared/BaseProgressBar.vue";
import { useQuizGame } from "@/composables/quizGame.js";
import SubmitButton from "@/components/shared/buttons/SubmitButton.vue";
import BaseErrorMessage from "@/components/shared/forms/BaseErrorMessage.vue";
import QuizResult from "@/components/features/quiz/QuizResult.vue";

const route = useRoute();
const quizGameService = useQuizGame();

onMounted(async () => {
  if (!route.params.id) {
    return;
  }

  await quizGameService.fetchQuizData(route.params.id);
  quizGameService.startGame();
});
</script>

<template>
  <div
    v-if="quizGameService.gameState.currentlyPlaying"
    class="flex gap-2 mt-14"
  >
    <header class="flex-1 flex gap-2 flex-col px-4 md:px-8 justify-center">
      <h1 class="text-4xl font-bold">
        {{ quizGameService.quizState.quiz.title }}
      </h1>
      <p class="text-muted-foreground">
        {{ quizGameService.quizState.quiz.description }}
      </p>
      <BaseProgressBar
        :current-step="quizGameService.gameState.currentQuestionIndex + 1"
        :last-step="quizGameService.quizState.quiz.numberOfQuestions"
      />
    </header>
    <section class="flex flex-col gap-5 flex-1">
      <h2 class="text-2xl font-semibold">
        {{ quizGameService.question.value.content }}
      </h2>
      <div class="space-y-4">
        <button
          v-for="(answer, index) in quizGameService.answers.value"
          :key="answer.id"
          :class="{
            'border-primary': answer.selected === true,
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100':
              answer.state === 'correct',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100':
              answer.state === 'wrong',
          }"
          class="inline-flex items-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-auto w-full justify-start p-4 text-left text-lg"
          :disabled="quizGameService.gameState.answeredState"
          @click="quizGameService.selectAnswer(index)"
        >
          <span
            class="mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm"
          >{{ String.fromCharCode(65 + index) }}</span>{{ answer.content }}
        </button>
      </div>
      <BaseErrorMessage :text="quizGameService.gameState.error" />
      <SubmitButton
        v-if="!quizGameService.gameState.answeredState"
        class="w-full py-7"
        @click="quizGameService.submitAnswer()"
      >
        Submit Answer
      </SubmitButton>
      <SubmitButton
        v-else-if="
          quizGameService.gameState.currentQuestionIndex + 1 ===
            quizGameService.quizState.quiz.numberOfQuestions &&
            quizGameService.gameState.answeredState
        "
        class="w-full py-7"
        @click="quizGameService.endGame(route.params.id)"
      >
        See result
      </SubmitButton>
      <SubmitButton
        v-else
        class="w-full py-7"
        @click="quizGameService.goToNextQuestion()"
      >
        Next Question
      </SubmitButton>
    </section>
  </div>
  <QuizResult v-else />
</template>

<style scoped></style>
