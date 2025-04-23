import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/feed",
    },
    {
      path: "/feed",
      name: "feed",
      component: () => import("../views/FeedView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../views/MapView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/profile/:username?",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("../views/PostView.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

// Навигационный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
