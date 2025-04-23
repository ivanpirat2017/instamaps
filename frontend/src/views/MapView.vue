<template>
  <main class="map-view">
    <MapContainer :selected-post="selectedPost" @update-selected="selectedPost = $event" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from '../stores/post';
import MapContainer from '../components/map/MapContainer.vue';
import type { Post } from '../stores/post';

const postStore = usePostStore();
const selectedPost = ref<Post | null>(postStore.posts[0]);
</script>

<style scoped lang="scss">
.map-view {
  position: relative;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: calc(100vh - var(--header-height) - var(--footer-height) - var(--mobile-nav-height));
    padding: 8px;
  }
}
</style>