<template>
  <nav class="nav-menu">
    <RouterLink
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :class="{ active: route.path === item.path }"
    >
      <VaIcon :name="item.icon" />
      <span class="nav-label">{{ $t(item.label) }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { VaIcon } from "vuestic-ui";

const route = useRoute();
const authStore = useAuthStore();

const navigationItems = [
  { path: "/search", icon: "search", label: "app.search" },
  { path: "/map", icon: "place", label: "app.map" },
  { path: "/feed", icon: "dashboard", label: "app.feed" },
  {
    path: authStore.isAuthenticated ? `/profile/${authStore.user?.username}` : "/auth",
    icon: authStore.isAuthenticated ? "person" : "login",
    label: authStore.isAuthenticated ? "app.profile" : "app.login",
  },
];
</script>

<style scoped lang="scss">
.nav-menu {
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--va-text-secondary);
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    color: var(--va-primary);
    background: var(--va-background-secondary);
    transform: translateY(-1px);
  }

  &.active {
    color: var(--va-primary);
    background: var(--va-background-secondary);

    .va-icon {
      transform: scale(1.1);
    }
  }

  .va-icon {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  .nav-label {
    font-size: 14px;
  }
}
</style>
