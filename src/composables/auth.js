import axios from "axios";

export async function setXsrfToken() {
  const xsrfToken = await axios.get("/sanctum/csrf-cookie");
}

export async function login(email, password) {
  try {
    await setXsrfToken();
    const response = await axios.post("/login", {
      email: email,
      password: password,
    });
  } catch (e) {
    if (!e.response.data.message) {
      console.log(e.message);
      return;
    }

    console.log(e.response.data.message);
  }
}

export async function logout() {
  try {
    await axios.post("/logout");
  } catch (e) {
    console.log(e);
  }
}
