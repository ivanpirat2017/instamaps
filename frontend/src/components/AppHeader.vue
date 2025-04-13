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
