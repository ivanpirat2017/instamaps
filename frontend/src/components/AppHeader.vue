<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">PhotoStream</router-link>
      <nav class="nav">
        <div class="burger" :class="{ active: isMenuOpen }" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="nav-menu" :class="{ active: isMenuOpen }">
          <li>
            <router-link to="/" @click="closeMenu"> <i class="fas fa-home"></i> Лента </router-link>
          </li>
          <li>
            <router-link to="/search" @click="closeMenu">
              <i class="fas fa-search"></i> Поиск
            </router-link>
          </li>
          <li>
            <router-link to="/map" @click="closeMenu">
              <i class="fas fa-map"></i> Карта
            </router-link>
          </li>
          <li>
            <router-link to="/profile" @click="closeMenu">
              <i class="fas fa-user"></i> Профиль
            </router-link>
          </li>
          <li v-if="!authStore.isAuthenticated">
            <router-link to="/auth" @click="closeMenu">
              <i class="fas fa-sign-in-alt"></i> Вход
            </router-link>
          </li>
          <li v-else>
            <a href="#" @click.prevent="logout" @click="closeMenu">
              <i class="fas fa-sign-out-alt"></i> Выход
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const authStore = useAuthStore();
const router = useRouter();

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function logout() {
  authStore.logout();
  router.push("/auth");
}
</script>
