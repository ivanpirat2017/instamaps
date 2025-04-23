<template>
  <header class="header" :class="{ dark: themeStore.isDarkMode }">
    <div class="header-content">
      <Logo />
      <NavMenu class="desktop-nav" />
      <div class="header-actions">
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from "./header/Logo.vue";
import NavMenu from "./header/NavMenu.vue";
import ThemeToggle from "./header/ThemeToggle.vue";
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();
</script>

<style scoped lang="scss">
.header {
  background: var(--va-background-primary);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;

  &.dark {
    background: var(--va-dark);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.desktop-nav {
  @media (max-width: 768px) {
    display: none;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
