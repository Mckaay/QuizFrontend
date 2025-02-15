import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("user", () => {
  const authenticated = ref(
    JSON.parse(localStorage.getItem("authenticated")) ?? false,
  );
  return { authenticated };
});
