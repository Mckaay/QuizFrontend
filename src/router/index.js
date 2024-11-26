import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizGameView from "@/views/QuizGameView.vue";
import LoginView from "@/views/LoginView.vue";
import CreateQuizView from "@/views/CreateQuizView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: QuizGameView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/create/quiz',
      name: 'create',
      component: CreateQuizView,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})

export default router
