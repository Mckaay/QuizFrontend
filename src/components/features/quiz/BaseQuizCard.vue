<script setup>
import { defineProps } from "vue";
import IconTimer from "@/components/shared/icons/IconTimer.vue";
import IconUsers from "@/components/shared/icons/IconUsers.vue";
import IconBook from "@/components/shared/icons/IconBook.vue";

defineProps({
  title: {
    type: String,
    default: "Title",
  },
  description: {
    type: String,
    default: "Description",
  },
  numberOfQuestions: {
    type: Number,
    default: 10,
  },
  time: {
    type: Number,
    default: 10,
  },
  timesPlayed: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div
    class="flex flex-col gap-1 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
  >
    <h3 class="text-xl font-semibold">
      {{ title }}
    </h3>
    <p class="text-muted-foreground">
      {{ description }}
    </p>
    <div class="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
      <div class="flex items-center">
        <IconBook />
        {{ numberOfQuestions }} questions
      </div>
      <div class="flex items-center">
        <IconTimer />
        {{ time }} mins
      </div>
      <div class="flex items-center">
        <IconUsers />
        {{ timesPlayed }} plays
      </div>
    </div>
  </div>
</template>

<style scoped></style>
