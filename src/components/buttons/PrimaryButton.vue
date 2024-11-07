<script setup>
const { text } = defineProps(['text']);
</script>

<template>
  <button class="primary-button">{{ text }}</button>
</template>

<style scoped>
  .primary-button {
    font-size: var(--font-size-110);
    font-weight: var(--font-weight-semi-bold);
    color: var(--color-pure-white);
    background-color: var(--color-purple);
    padding: var(--spacing-75);
    border: 0;
    line-height: 1;
    border-radius: var(--border-radius-medium);
    cursor: pointer;

    @media screen and (min-width: 768px) {
      font-size: var(--font-size-175);
      height: unset;
      border-radius: var(--border-radius-extra-large);
      padding: var(--spacing-200);
    }
  }

  .primary-button:hover,
  .primary-button:focus {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), var(--color-purple);
  }
</style>