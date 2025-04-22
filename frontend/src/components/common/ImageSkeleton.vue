<template>
  <div class="image-skeleton" :style="{ aspectRatio }">
    <div class="skeleton-animation">
      <VaIcon name="image" />
    </div>
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
  background: var(--white-transparent);
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-animation {
  animation: pulse 1.5s infinite;
  color: var(--primary-color);
  opacity: 0.2;
  font-size: 48px;
}

@keyframes pulse {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
