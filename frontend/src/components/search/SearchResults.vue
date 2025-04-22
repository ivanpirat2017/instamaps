<template>
  <div class="search-results">
    <ResultItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import ResultItem from "./ResultItem.vue";
import { type Post } from "../../stores/post";

defineProps<{
  posts: Post[];
}>();
</script>

<style scoped>
.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .search-results {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
