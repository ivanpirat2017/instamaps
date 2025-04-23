<template>
  <nav class="mobile-navigation" v-if="isMobileDevice">
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
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { VaIcon } from "vuestic-ui";

const route = useRoute();
const authStore = useAuthStore();
const isMobileDevice = ref(false);

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

function checkMobile() {
  isMobileDevice.value = window.innerWidth <= 768;
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped lang="scss">
.mobile-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--va-background-primary);
  padding: 8px 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-top: 1px solid var(--va-border);

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--va-text-secondary);
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &.active {
      color: var(--va-primary);

      .va-icon {
        transform: translateY(-2px);
      }
    }

    &:hover {
      color: var(--va-primary);
      background: var(--va-background-secondary);
    }

    .va-icon {
      font-size: 24px;
      margin-bottom: 4px;
      transition: transform 0.2s ease;
    }

    .nav-label {
      font-size: 12px;
    }
  }
}

/* Добавляем отступ для контента, чтобы он не перекрывался навигацией на мобильных устройствах */
:deep(.container) {
  @media (max-width: 768px) {
    padding-bottom: 80px;
  }
}
</style>
