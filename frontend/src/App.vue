<template>
  <div class="app-layout flex flex-col min-h-screen" :class="{ dark: themeStore.isDarkMode }">
    <AppHeader />
    <main class="flex-grow flex flex-col animate-fade-in">
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { useThemeStore } from "./stores/theme";
const themeStore = useThemeStore();
themeStore.toggleTheme();
</script>

<style>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
