import axios from "axios";
import { useUserStore } from "@/stores/auth.js";
import router from "@/router/index.js";

export default function useAuth() {
  const setXsrfToken = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };

  const login = async (email, password) => {
    await setXsrfToken();
    await axios.post("/login", {
      email: email,
      password: password,
    });
  };

  const logout = async () => {
    await axios.post("/logout");
  };

  return { setXsrfToken, login, logout };
}
