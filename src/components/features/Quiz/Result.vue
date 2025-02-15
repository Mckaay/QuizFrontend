<script setup>
  import BaseHeader from "@/components/shared/Text/BaseHeader.vue";
  import PrimaryButton from "@/components/shared/Button/PrimaryButton.vue";
  import QuizInfo from "@/components/features/Quiz/QuizInfo.vue";
  import {useThemeStore} from "@/stores/theme.js";

  const themeStore = useThemeStore();
  const { score, totalQuestions, quizIcon, quizTitle } = defineProps(["score","totalQuestions","quizIcon","quizTitle"]);
  defineEmits(["restartGame"])
</script>

<template>
  <div class="wrapper">
    <BaseHeader intro-text="Quiz completed" title="You scored..."/>
    <div class="result-wrapper" :class="{ dark: themeStore.isDark }">
      <QuizInfo :quizIcon="quizIcon" :quizTitle="quizTitle"/>
      <div class="score-wrapper">
        <div class="score">{{ score }}</div>
        <div class="max-score">out of {{ totalQuestions }}</div>
      </div>
    </div>
    <PrimaryButton  @click="$emit('restartGame')" text="Play Again"/>
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-75);
    padding-top: var(--spacing-50);

    @media screen and (min-width: 768px) {
      gap: var(--spacing-200);
      padding-top: unset;
    }

    @media screen and (min-width: 1268px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-200);
      padding-top: var(--spacing-530);

      .primary-button {
        grid-column: 2 / -1;
      }
    }
  }

  .result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-100);
    padding: var(--spacing-200);
    background-color: var(--color-pure-white);
    border-radius: var(--border-radius-medium);
    margin-top: var(--spacing-175);

    @media screen and (min-width: 768px) {
      margin-top: var(--spacing-200);
      padding: var(--spacing-300);
      gap: var(--spacing-250);
    }

    @media screen and (min-width: 1268px) {
      margin-top: 0;
    }
  }

  .result-wrapper.dark {
    background-color: var(--color-navy);
    color: var(--color-pure-white);

    .max-score {
      color: var(--color-light-bluish);
    }
  }

  .score-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-100);
    align-items: center;
  }

  .score {
    font-size: var(--font-size-550);
    font-weight: var(--font-weight-semi-bold);
    line-height: 1;

    @media screen and (min-width: 768px) {
      font-size: var(--font-size-900);
    }
  }

  .max-score {
    font-size: var(--font-size-110);
    font-weight: var(--font-weight-regular);
    color: var(--color-grey-navy);
    line-height: 1;

    @media screen and (min-width: 768px) {
      font-size: var(--font-size-150);

    }
  }
</style>