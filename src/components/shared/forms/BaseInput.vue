<script setup>
import { defineProps } from "vue";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col space-y-1.5">
    <label class="text-sm font-medium leading-none">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
