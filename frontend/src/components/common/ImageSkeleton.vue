<template>
  <div class="image-skeleton">
    <div class="shimmer"></div>
  </div>
</template>

<script setup lang="ts">
import { VaIcon } from "vuestic-ui";

defineProps<{
  aspectRatio?: string;
}>();
</script>

<style scoped lang="scss">
.image-skeleton {
  width: 100%;
  height: 100%;
  background: var(--va-background-secondary);
  position: relative;
  overflow: hidden;
  border-radius: inherit;
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(var(--va-primary-rgb), 0.02) 25%,
    rgba(var(--va-primary-rgb), 0.1) 37%,
    rgba(var(--va-primary-rgb), 0.02) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
