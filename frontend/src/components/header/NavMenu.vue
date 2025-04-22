<template>
  <nav class="nav-menu">
    <RouterLink
      v-for="item in menuItems"
      :key="item.name"
      :to="item.to"
      class="nav-link"
      :class="{ active: route.name === item.name }"
    >
      <VaIcon :name="item.icon" />
      <span class="nav-text">{{ $t(item.label) }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { VaIcon } from "vuestic-ui";
import { useAuthStore } from "../../stores/auth";

const route = useRoute();
const authStore = useAuthStore();

const menuItems = computed(() => [
  {
    name: "feed",
    to: { name: "feed" },
    icon: "home",
    label: "app.feed",
  },
  {
    name: "search",
    to: { name: "search" },
    icon: "search",
    label: "app.search",
  },
  {
    name: "map",
    to: { name: "map" },
    icon: "map",
    label: "app.map",
  },
  {
    name: "profile",
    to: {
      name: "profile",
      params: {
        username: authStore.user?.username,
      },
    },
    icon: "person",
    label: "app.profile",
  },
]);
</script>

<style scoped lang="scss">
.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover,
  &.active {
    color: var(--primary-color);
    background: var(--white-transparent);
  }

  .nav-text {
    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>
