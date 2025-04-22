<template>
  <div class="post-image-container">
    <ImageSkeleton v-if="loading" />
    <img
      v-show="!loading"
      :src="src"
      :alt="alt"
      class="w-full rounded-lg"
      loading="lazy"
      decoding="async"
      @load="loading = false"
      @error="loading = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageSkeleton from "../common/ImageSkeleton.vue";

defineProps<{
  src: string;
  alt: string;
}>();

const loading = ref(true);
</script>

<style scoped>
.post-image-container {
  width: 100%;
  min-height: 200px;
}
</style>
