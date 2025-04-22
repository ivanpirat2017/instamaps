<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <Copyright />
      <SocialLinks />
    </div>
  </footer>
</template>

<script setup lang="ts">
import Copyright from "./footer/Copyright.vue";
import SocialLinks from "./footer/SocialLinks.vue";
</script>

<style scoped>
.footer {
  background: var(--white-transparent);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-color);
  padding: 16px 0;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}
</style>
