<template>
  <div class="flex flex-col min-h-screen" :class="{ dark: themeStore.isDarkMode }">
    <AppHeader />
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
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
