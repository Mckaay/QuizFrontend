import axios from "axios";
import { reactive } from "vue";

const error = reactive({
  message: "",
});

export default function useAuth() {
  const login = async (email, password) => {
    return await axios.post("/login", {
      email: email,
      password: password,
    });
  };

  const logout = async () => {
    await axios.post("/logout");
  };

  return { error, login, logout };
}
