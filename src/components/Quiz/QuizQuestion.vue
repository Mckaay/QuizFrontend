<script setup>
 const props = defineProps(['text'])
</script>

<template>
  <div class="quiz-question">
      {{ props.text }}
  </div>
</template>

<style scoped>
  .quiz-question {
    font-size: var(--font-size-125);
    font-weight: var(--font-weight-semi-bold);
    line-height: 120%;


    @media screen and (min-width: 768px) {
      font-size: var(--font-size-225);
    }
  }
</style>