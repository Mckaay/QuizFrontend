import axios from "axios";

export default function useAuth(loggedIn) {
  const setXsrfToken = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };

  const login = async (email, password) => {
    try {
      await setXsrfToken();
      await axios.post("/login", {
        email: email,
        password: password,
      });

      loggedIn.value = true;
    } catch (e) {
      if (!e.response?.data?.message) {
        console.log(e.message);
        return;
      }

      loggedIn.value = false;
      console.log(e.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      loggedIn.value = false;
    } catch (e) {
      console.log(e);
    }
  };

  return { setXsrfToken, login, logout };
}