<template>
  <main class="container">
    <section class="search-container mb-4">
      <h2>{{ $t('app.searchPhotos') }}</h2>
      <SearchBar v-model="searchQuery" @search="search" />
    </section>
    <section class="search-container">
      <FilterTags v-model="activeTag" :tags="tags" @filter="filterByTag" />
      <SearchResults :posts="filteredPosts" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePostStore } from '../stores/post';
import SearchBar from '../components/search/SearchBar.vue';
import FilterTags from '../components/search/FilterTags.vue';
import SearchResults from '../components/search/SearchResults.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const postStore = usePostStore();
const searchQuery = ref('');
const activeTag = ref<string | null>(null);

const tags = computed(() => {
  const allTags = new Set<string>();
  postStore.posts.forEach((post) => {
    post.tags?.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
});

const filteredPosts = computed(() => {
  let filtered = postStore.posts;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (activeTag.value) {
    filtered = filtered.filter((post) => post.tags?.includes(activeTag.value!));
  }

  return filtered;
});

function search() {
  activeTag.value = null;
}

function filterByTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag;
  searchQuery.value = '';
}
</script>