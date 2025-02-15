import {defineStore} from "pinia";
import {ref} from "vue";

export const useGameStore = defineStore("game", () => {
    const playing = ref(false);

    return {
        playing,
    };
});
