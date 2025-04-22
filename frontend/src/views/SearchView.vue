<template>
  <main class="container">
    <section class="search-section">
      <SearchBar v-model="searchQuery" />
      <FilterTags v-model="selectedTags" :tags="availableTags" />
    </section>
    <SearchResults :query="searchQuery" :selected-tags="selectedTags" />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePostStore } from "../stores/post";
import SearchBar from "../components/search/SearchBar.vue";
import FilterTags from "../components/search/FilterTags.vue";
import SearchResults from "../components/search/SearchResults.vue";

const postStore = usePostStore();
const searchQuery = ref("");
const selectedTags = ref<string[]>([]);

// Получаем уникальные теги из всех постов
const availableTags = computed(() => {
  const tagsSet = new Set<string>();
  postStore.posts.forEach((post) => {
    post.tags?.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
});
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.search-section {
  margin-bottom: 24px;
}
</style>
