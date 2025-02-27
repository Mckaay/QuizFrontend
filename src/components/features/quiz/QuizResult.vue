<script setup>
import { formatDuration } from "@/services/helpers.js";
import SubmitButton from "@/components/shared/buttons/SubmitButton.vue";
import IconClock from "@/components/shared/icons/IconClock.vue";
import IconBarChart from "@/components/shared/icons/IconBarChart.vue";
import IconRefresh from "@/components/shared/icons/IconRefresh.vue";
import IconAward from "@/components/shared/icons/IconAward.vue";
import { useQuizGame } from "@/composables/quizGame.js";
import { useRouter } from "vue-router";

const quizGameService = useQuizGame();
const router = useRouter();
</script>

<template>
  <div
    class="relative w-full max-w-2xl rounded-lg border p-8 shadow-lg dark:border-gray-700 mx-auto mt-14"
  >
    <h1 class="mb-6 text-center text-3xl font-bold">Quiz Results</h1>
    <div class="mb-8 grid gap-6 md:grid-cols-2">
      <div class="flex items-center gap-4">
        <IconAward />
        <div>
          <p class="text-sm text-muted-foreground dark:text-gray-400">Score</p>
          <p class="text-2xl font-bold">
            {{
              `${quizGameService.gameState.score} / ${quizGameService.quizState.quiz.numberOfQuestions}`
            }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <IconClock />
        <div>
          <p class="text-sm text-muted-foreground dark:text-gray-400">
            Time Taken
          </p>
          <p class="text-2xl font-bold">
            {{
              formatDuration(
                quizGameService.gameState.startTimestamp,
                quizGameService.gameState.endTimestamp,
              )
            }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <IconBarChart />
        <div>
          <p class="text-sm text-muted-foreground dark:text-gray-400">
            Accuracy
          </p>
          <p class="text-2xl font-bold">
            {{
              (
                quizGameService.gameState.score /
                quizGameService.quizState.quiz.numberOfQuestions
              ).toFixed(2) * 100
            }}%
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <IconRefresh />
        <div>
          <p class="text-sm text-muted-foreground dark:text-gray-400">
            Questions Attempted
          </p>
          <p class="text-2xl font-bold">
            {{ quizGameService.gameState.currentQuestionIndex + 1 }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <SubmitButton @click="router.go(0)"> Retake Quiz </SubmitButton>
    </div>
  </div>
</template>

<style scoped></style>
