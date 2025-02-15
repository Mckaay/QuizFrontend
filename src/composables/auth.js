import axios from "axios";
import router from "@/router/index.js";
import {reactive} from "vue";


const error = reactive({
    message: '',
});

export default function useAuth() {
    const setXsrfToken = async () => {
        await axios.get("/sanctum/csrf-cookie");
    };

    const login = async (email, password) => {
        await setXsrfToken();

        try {
            await axios.post("/login", {
                email: email,
                password: password,
            });
            localStorage.setItem("authenticated", "true");
            error.message = '';
        } catch (e) {
            if (e.status === 422) {
                error.message = e.response.data.message;
            }

            console.log(e)
        }
    };

    const logout = async () => {
        try {
            await axios.post("/logout");
            await router.push('/login');
        } catch (e) {
            console.log(e);
        } finally {
            localStorage.removeItem("authenticated");
        }
    };

    return {error, setXsrfToken, login, logout};
}
