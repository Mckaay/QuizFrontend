<script setup>
import BaseInput from "@/components/shared/forms/BaseInput.vue";
import BaseQuizCard from "@/components/features/quiz/BaseQuizCard.vue";
import { onMounted } from "vue";
import { useQuizApi } from "@/composables/quizApi.js";
import BasePagination from "@/components/shared/pagination/BasePagination.vue";

const quizService = useQuizApi();

onMounted(async () => {
  await quizService.fetchQuizzes();
});
</script>

<template>
  <div class="md:flex md:py-8">
    <header class="flex-1 mt-5 md:mt-20">
      <h1 class="text-4xl font-bold">
        Welcome to <br />
        the Quiz Game!
      </h1>
      <p class="text-muted-foreground mt-2">Pick a subject to get started</p>
    </header>
    <section class="flex flex-col gap-3 flex-1">
      <BaseInput
        type="text"
        placeholder="Search Quizzes"
        @update:model-value="quizService.updateParameter('searchQuery', $event)"
      />
      <BaseQuizCard
        v-for="quiz in quizService.state.quizzes"
        :key="quiz.id"
        :title="quiz.title"
        :description="quiz.description"
        :number-of-questions="quiz.numberOfQuestions"
        :time="quiz.time"
        :times-played="quiz.timesPlayed"
      />
      <div class="flex justify-center">
        <BasePagination
          :current-page="quizService.state.parameters.currentPage"
          :last-page="quizService.state.parameters.lastPage"
          @update:current-page="
            quizService.updateParameter('currentPage', $event)
          "
        />
      </div>
    </section>
  </div>
</template>

<style scoped></style>
