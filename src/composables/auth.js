import axios from "axios";
import { reactive } from "vue";

const error = reactive({
  message: "",
});

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
    localStorage.setItem("authenticated", "true");
  };

  const logout = async () => {
    await axios.post("/logout");
  };

  return { error, setXsrfToken, login, logout };
}
