import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useAuth from "../composables/auth.js";

export const useUserStore = defineStore('user', () => {
        const loggedIn = ref(false);
        const login = async () => {
            await useAuth.login(loggedIn);
        }

        const logout = async () => {
            await useAuth.logout(loggedIn);
        }

    return { loggedIn }
    }
)