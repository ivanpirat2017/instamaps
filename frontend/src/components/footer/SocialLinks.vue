<template>
  <div class="social-links">
    <VaButton
      v-for="link in socialLinks"
      :key="link.label"
      :href="link.href"
      preset="plain"
      color="primary"
      class="social-link"
      :aria-label="link.label"
    >
      {{ link.label }}
    </VaButton>
  </div>
</template>

<script setup lang="ts">
import { VaButton } from "vuestic-ui";

const socialLinks = [
  { label: "X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Contact", href: "mailto:contact@photostream.com" },
];
</script>

<style scoped>
.social-link {
  margin-left: 12px;
}
</style>
