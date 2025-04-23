<template>
  <footer class="footer" :class="{ mobile: isMobileDevice }">
    <div class="footer-content">
      <Copyright />
      <SocialLinks />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Copyright from "./footer/Copyright.vue";
import SocialLinks from "./footer/SocialLinks.vue";

const isMobileDevice = ref(false);

onMounted(() => {
  const checkMobile = () => {
    isMobileDevice.value = window.innerWidth <= 768;
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);
});
</script>

<style scoped lang="scss">
.footer {
  background: var(--va-background-primary);
  border-top: 1px solid var(--va-border);
  padding: 24px 0;
  margin-top: auto;

  &.mobile {
    margin-bottom: 60px; // Высота мобильной навигации
  }
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
}
</style>
