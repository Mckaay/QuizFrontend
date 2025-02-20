import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import useAuth from "@/composables/auth.js";
import router from "@/router/index.js";

export const useAuthStore = defineStore("user", () => {
    const authenticated = ref(
        JSON.parse(localStorage.getItem("authenticated")) ?? false,
    );

    const error = reactive({
        message: '',
    });

    const authService = useAuth();
    const login = async (email, password) => {
        try {
            await authService.login(email, password);
            localStorage.setItem('authenticated', 'true');
            authenticated.value = true;
            await router.push('/');
        } catch (e) {
            if (e.status === 422) {
                error.message = e.response.data.message;
            }
            console.log(e);
            localStorage.removeItem("authenticated");
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            authenticated.value = false;
        } catch (e) {
            console.log(e);
        } finally {
            localStorage.removeItem("authenticated");
        }
    }

    return {authenticated, login, logout, error};
});
