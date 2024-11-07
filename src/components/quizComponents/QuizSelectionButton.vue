<script setup>
import {useThemeStore} from "@/stores/theme.js";
import useGetDynamicImageUrl from "@/composables/getDynamicImageUrl.js";

const { quiz } = defineProps(['quiz'])
const themeStore = useThemeStore();

const { path } = useGetDynamicImageUrl(quiz.icon);
</script>

<template>
  <RouterLink :to="`/quiz/${quiz.id}`">
    <div class="button-container" :class="{ dark: themeStore.isDark }">
      <img :src="path" alt="html-icon">
      <div class="quiz-title">{{ quiz.title }}</div>
    </div>
  </RouterLink>
</template>

<style scoped>
  a {
    all: unset;
  }

  .button-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-100);
    padding: var(--spacing-75);
    background-color: var(--color-pure-white);
    border-radius: var(--border-radius-medium);
    box-shadow: 0px 16px 40px 0px rgba(143, 160, 193, 0.14);
    cursor: pointer;


    @media screen and (min-width: 768px) {
      gap: var(--spacing-200);
      border-radius: var(--border-radius-extra-large);
    }

    @media screen and (min-width: 1268px) {
      padding: var(--spacing-125);
    }
  }

  .button-container:hover,
  .button-container:focus,
  .button-container:active
  {
    background-color: var(--color-light-bluish);
  }

  div.button-container.dark {
    background-color: var(--color-navy);
    color: var(--color-pure-white);
    box-shadow: 0px 16px 40px 0px rgba(49, 62, 81, 0.14);
  }

  div.button-container.dark:hover,
  div.button-container.dark:focus,
  div.button-container.dark:active
  {
    background-color: #2A3B44;
  }

  img {
    border-radius: 4px;

    @media screen and (min-width: 768px) {
      width: 56px;
      height: 56px;
    }
  }

  .quiz-title {
    font-size: var(--font-size-110);
    font-weight: var(--font-weight-semi-bold);

    @media screen and (min-width: 768px) {
      font-size: var(--font-size-175);
    }
  }
</style>