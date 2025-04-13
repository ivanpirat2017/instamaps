<template>
  <VaButton
    preset="plain"
    :icon="themeStore.isDarkMode ? 'sunny' : 'dark_mode'"
    aria-label="Toggle theme"
    @click="themeStore.toggleTheme"
  />
</template>

<script setup lang="ts">
import { VaButton } from "vuestic-ui";
import { useThemeStore } from "../../stores/theme";
const themeStore = useThemeStore();
</script>
