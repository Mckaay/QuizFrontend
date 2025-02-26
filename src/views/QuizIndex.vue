<script setup>
import BaseInput from "@/components/shared/forms/BaseInput.vue";
import BaseQuizCard from "@/components/features/quiz/BaseQuizCard.vue";
import { onMounted } from "vue";
import { useQuizApi } from "@/composables/quizApi.js";
import BasePagination from "@/components/shared/pagination/BasePagination.vue";

const quizApi = useQuizApi();

onMounted(async () => {
  await quizApi.fetchQuizzes();
});
</script>

<template>
  <div class="md:flex md:py-8">
    <header class="flex-1 flex flex-col justify-center">
      <h1 class="text-4xl font-bold">
        Welcome to the Quiz Game!
      </h1>
      <p class="text-muted-foreground mt-2">
        Pick a subject to get started
      </p>
    </header>
    <section class="flex flex-col gap-3 flex-1">
      <BaseInput
        type="text"
        placeholder="Search Quizzes"
        @update:model-value="quizApi.updateParameter('searchQuery', $event)"
      />
      <RouterLink
        v-for="quiz in quizApi.state.quizzes"
        :key="quiz.id"
        :to="{
          name: 'quiz',
          params: {
            id: quiz.id,
          },
        }"
      >
        <BaseQuizCard
          :title="quiz.title"
          :description="quiz.description"
          :number-of-questions="quiz.numberOfQuestions"
          :time="quiz.time"
          :times-played="quiz.timesPlayed"
        />
      </RouterLink>
      <div class="flex justify-center">
        <BasePagination
          :current-page="quizApi.state.parameters.currentPage"
          :last-page="quizApi.state.parameters.lastPage"
          @update:current-page="quizApi.updateParameter('currentPage', $event)"
        />
      </div>
    </section>
  </div>
</template>

<style scoped></style>
