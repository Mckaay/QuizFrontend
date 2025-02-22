<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <p class="text-sm color text-red-500">
    {{ text }}
  </p>
</template>

<style scoped></style>
