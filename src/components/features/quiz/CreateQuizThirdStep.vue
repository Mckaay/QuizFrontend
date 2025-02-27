<script setup>
import { useQuiz } from "@/composables/quiz.js";

const quizService = useQuiz();
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">
      Review Quiz
    </h2>
    <div class="space-y-6">
      <div class="rounded-lg border p-4">
        <h3 class="text-lg font-semibold">
          Quiz Details
        </h3>
        <dl class="mt-4 space-y-2">
          <div class="grid grid-cols-3">
            <dt class="font-medium text-muted-foreground">
              Title:
            </dt>
            <dd class="col-span-2">
              {{ quizService.state.value.title }}
            </dd>
          </div>
          <div class="grid grid-cols-3">
            <dt class="font-medium text-muted-foreground">
              Description:
            </dt>
            <dd class="col-span-2">
              {{ quizService.state.value.description }}
            </dd>
          </div>
          <div class="grid grid-cols-3">
            <dt class="font-medium text-muted-foreground">
              Duration:
            </dt>
            <dd class="col-span-2">
              {{ quizService.state.value.time }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="rounded-lg border p-4">
        <h3 class="text-lg font-semibold mb-4">
          Questions
        </h3>
        <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          <div
            v-for="(question, questionIndex) in quizService.state.value
              .questions"
            :key="questionIndex"
            class="rounded-lg border"
          >
            <button
              class="w-full px-4 py-2 text-left font-medium hover:bg-muted/50 focus:outline-none"
            >
              {{ `Question ${questionIndex + 1}: ${question.content}` }}
            </button>
            <div class="px-4 py-2">
              <ul class="mt-2 space-y-1">
                <li
                  v-for="(answer, answerIndex) in question.answers"
                  :key="answerIndex"
                  class="flex items-center space-x-2"
                >
                  <span
                    class="inline-flex h-6 w-6 items-center justify-center rounded-full text-sm"
                    :class="
                      answer.is_correct
                        ? 'text-primary-foreground bg-primary'
                        : 'bg-muted text-muted-foreground'
                    "
                  >{{ String.fromCharCode(65 + answerIndex) }}</span><span>{{ answer.content }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
