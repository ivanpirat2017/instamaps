<template>
  <div class="post-image-container" :class="{ loading }">
    <ImageSkeleton v-if="loading" />
    <img
      v-show="!loading"
      :src="src"
      :alt="alt"
      class="post-image"
      loading="lazy"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-if="error" class="error-overlay">
      <VaIcon name="broken_image" />
      <p>{{ $t("app.imageLoadError") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VaIcon } from "vuestic-ui";
import ImageSkeleton from "../common/ImageSkeleton.vue";

defineProps<{
  src: string;
  alt: string;
}>();

const loading = ref(true);
const error = ref(false);

function handleLoad() {
  loading.value = false;
  error.value = false;
}

function handleError() {
  loading.value = false;
  error.value = true;
}
</script>

<style scoped lang="scss">
.post-image-container {
  position: relative;
  width: 100%;
  min-height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--va-background-secondary);

  &.loading {
    animation: pulse 1.5s ease-in-out infinite;
  }
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

.error-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--va-background-primary);
  color: var(--va-text-secondary);

  .va-icon {
    font-size: 48px;
    opacity: 0.5;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.7;
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
