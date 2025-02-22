import { createRouter, createWebHistory } from "vue-router";
import QuizIndex from "../views/QuizIndex.vue";
import QuizShow from "@/views/QuizShow.vue";
import LoginIndex from "@/views/LoginIndex.vue";
import QuizStore from "@/views/QuizStore.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: QuizIndex,
    },
    {
      path: "/quiz/:id",
      name: "quiz",
      component: QuizShow,
    },
    {
      path: "/login",
      name: "login",
      component: LoginIndex,
    },
    {
      path: "/quiz/create",
      name: "create",
      component: QuizStore,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

export default router;
