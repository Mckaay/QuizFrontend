<script setup>
import ItalicParagraph from "@/components/Text/ItalicParagraph.vue";

const { introText, title, italicText } = defineProps([
  "introText",
  "title",
  "italicText",
]);
</script>

<template>
  <header class="quiz-header">
    <p class="intro-text">{{ introText }}</p>
    <h1 class="title">{{ title }}</h1>
    <ItalicParagraph class="italic" :text="italicText" />
  </header>
</template>

<style scoped>
.quiz-header {
  padding-top: var(--spacing-200);

  @media screen and (min-width: 768px) {
    padding-top: var(--spacing-300);
  }

  @media screen and (min-width: 1268px) {
    max-width: 460px;
    padding-top: 0;

    .italic {
      margin-top: var(--spacing-300);
    }
  }
}

.intro-text {
  font-size: var(--font-size-250);
  font-weight: var(--font-weight-light);
  line-height: 1;
  margin-bottom: var(--spacing-50);

  @media screen and (min-width: 768px) {
    font-size: var(--font-size-400);
  }
}

.title {
  font-size: var(--font-size-250);
  font-weight: var(--font-weight-semi-bold);
  line-height: 1;

  @media screen and (min-width: 768px) {
    font-size: var(--font-size-400);
  }
}
</style>
