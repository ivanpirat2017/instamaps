<template>
  <VaDropdown v-model="isOpen" :close-on-click-outside="true" v-if="isMobile">
    <template #anchor>
      <BurgerMenu v-if="isMobile" :is-open="isMobile" />
    </template>
    <VaDropdownContent class="nav-menu">
      <ul>
        <li v-for="item in navItems" :key="item.path">
          <router-link :to="item.path" class="nav-link" @click="$emit('close')">
            <VaIcon :name="item.icon" />
            {{ item.label }}
          </router-link>
        </li>
        <li v-if="!authStore.isAuthenticated">
          <router-link to="/auth" class="nav-link" @click="$emit('close')">
            <VaIcon name="login" />
            {{ $t("app.login") }}
          </router-link>
        </li>
        <li v-else>
          <VaButton preset="plain" color="danger" class="nav-link" @click.prevent="logout">
            <VaIcon name="logout" />
            {{ $t("app.logout") }}
          </VaButton>
        </li>
      </ul>
    </VaDropdownContent>
  </VaDropdown>
  <ul class="nav-menu" v-else>
    <li v-for="item in navItems" :key="item.path">
      <router-link :to="item.path" class="nav-link" active-class="active">
        <VaIcon :name="item.icon" />
        {{ item.label }}
      </router-link>
    </li>
    <li v-if="!authStore.isAuthenticated">
      <router-link to="/auth" class="nav-link">
        <VaIcon name="login" />
        {{ $t("app.login") }}
      </router-link>
    </li>
    <li v-else>
      <VaButton preset="plain" color="danger" class="nav-link" @click.prevent="logout">
        <VaIcon name="logout" />
        {{ $t("app.logout") }}
      </VaButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
import BurgerMenu from "./BurgerMenu.vue";
import { VaDropdown, VaDropdownContent, VaButton, VaIcon } from "vuestic-ui";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import { computed, defineProps, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  isOpen: boolean;
}>();

const isOpen = ref(props.isOpen);

const emit = defineEmits(["close"]);

const authStore = useAuthStore();
const router = useRouter();

const isMobile = ref(window.innerWidth < 768);
const onResize = () => {
  isMobile.value = window.innerWidth < 768;
};
window.addEventListener("resize", onResize);

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

const navItems = [
  { path: "/", label: t("app.feed"), icon: "home" },
  { path: "/search", label: t("app.search"), icon: "search" },
  { path: "/map", label: t("app.map"), icon: "map" },
  { path: "/profile", label: t("app.profile"), icon: "person" },
];

function logout() {
  authStore.logout();
  router.push("/auth");
  emit("close");
}
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-menu {
  display: flex;
  gap: 16px;
  list-style: none;
}

@media (max-width: 768px) {
  .nav-menu {
    flex-direction: column;
    padding: 20px;
    background: var(--white-transparent);
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
