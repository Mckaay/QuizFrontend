import { ref } from "vue";
import { defineStore } from "pinia";
import useAuth from "../composables/auth.js";
import router from "@/router/index.js";

export const useUserStore = defineStore("user", () => {
  const loggedIn = ref(
    JSON.parse(localStorage.getItem("authenticated")) ?? false,
  );
  const errorMessage = ref("");

  const auth = useAuth();
  const login = async (email, password) => {
    try {
      await auth.login(email, password);
      localStorage.setItem("authenticated", "true");
      loggedIn.value = true;
      errorMessage.value = "";
      await router.push("/");
    } catch (e) {
      errorMessage.value = e.response.data.message;
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      localStorage.removeItem("authenticated");
      loggedIn.value = false;
      await router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return { loggedIn, login, logout, errorMessage };
});
