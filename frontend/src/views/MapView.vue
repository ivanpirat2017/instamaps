<template>
  <main class="container">
    <MapContainer :selected-post="selectedPost" @update-selected="selectedPost = $event" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from '../stores/post';
import MapContainer from '../components/map/MapContainer.vue';
import { Post } from '../stores/post';

const postStore = usePostStore();
const selectedPost = ref<Post | null>(postStore.posts[0]);
</script>