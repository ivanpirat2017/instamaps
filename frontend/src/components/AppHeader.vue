<template>
  <header class="header" role="banner">
    <div class="container">
      <Logo />
      <nav class="nav" aria-label="Main navigation">
        <NavMenu :is-open="isMenuOpen" @close="closeMenu" :is-mobile="isMobile" />
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Logo from "./header/Logo.vue";
import NavMenu from "./header/NavMenu.vue";
import ThemeToggle from "./header/ThemeToggle.vue";

const isMenuOpen = ref(false);
const isMobile = computed(() => window.innerWidth <= 768);

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<style scoped>
.header {
  background: var(--white-transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 12px 0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  transition: color 0.3s;

  &:hover {
    color: var(--accent-color);
  }
}

.nav {
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}
</style>
