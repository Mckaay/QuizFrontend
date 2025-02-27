import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import useAuth from "@/composables/auth.js";
import router from "@/router/index.js";

export const useAuthStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") ?? false);

  const error = reactive({
    message: "",
  });

  const authService = useAuth();
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("token", response.data.token);
      token.value = response.data.token;
      await router.push("/");
    } catch (e) {
      if (e.status === 422) {
        error.message = e.response.data.message;
      }
      localStorage.removeItem("token");
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      token.value = false;
    } catch (e) {
      console.log(e);
    } finally {
      token.value = false;
      localStorage.removeItem("token");
    }
  };

  return { token, login, logout, error };
});
