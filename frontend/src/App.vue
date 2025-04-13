<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <router-view />
    <footer class="footer">
      <div class="container">
        <p>© 2025 PhotoStream. Все права защищены.</p>
        <div class="social-links">
          <a href="#">X</a>
          <a href="#">Instagram</a>
          <a href="#">Контакты</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
</script>