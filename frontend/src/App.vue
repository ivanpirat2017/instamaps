<template>
  <div class="app-layout" :class="{ dark: themeStore.isDarkMode }">
    <AppHeader />
    <main class="flex flex-col min-h-screen">
      <Transition name="fade" mode="out-in">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <template #default>
                <div class="page-content">
                  <component :is="Component" />
                </div>
              </template>
              <template #fallback>
                <div class="loading-container">
                  <va-progress-circle indeterminate color="primary" />
                </div>
              </template>
            </Suspense>
          </template>
        </RouterView>
      </Transition>
    </main>
    <AppFooter />
    <MobileNavigation />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useAuthStore } from "./stores/auth";
import { usePostStore } from "./stores/post";
import { useThemeStore } from "./stores/theme";
import { useRoute } from "vue-router";
import { VaProgressCircle } from "vuestic-ui";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import MobileNavigation from "./components/header/MobileNavigation.vue";

const themeStore = useThemeStore();
const authStore = useAuthStore();
const postStore = usePostStore();
const route = useRoute();

// Загружаем данные при старте приложения
onMounted(async () => {
  await Promise.all([authStore.fetchUsers(), postStore.fetchPosts()]);
});

// Следим за изменениями маршрута для обновления заголовка страницы
watch(
  () => route.path,
  () => {
    const routeName = route.name ? String(route.name) : "";
    document.title = routeName ? `${routeName} | PhotoStream` : "PhotoStream";
  },
  { immediate: true }
);
</script>

<style lang="scss">
@import "./assets/styles.scss";

.app-layout {
  min-height: 100vh;
  background: var(--va-background);
  color: var(--va-text-primary);
}

.page-content {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding: var(--content-padding);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .app-layout {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
