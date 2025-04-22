<template>
  <main class="container">
    <section class="search-container mb-4">
      <h2>{{ $t("app.searchPhotos") }}</h2>
      <SearchBar v-model="searchQuery" @search="search" />
    </section>
    <section class="search-container">
      <FilterTags v-model="activeTag" :tags="tags" @filter="filterByTag" />
      <SearchResults :posts="filteredPosts" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePostStore } from "../stores/post";
import SearchBar from "../components/search/SearchBar.vue";
import FilterTags from "../components/search/FilterTags.vue";
import SearchResults from "../components/search/SearchResults.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const postStore = usePostStore();
const searchQuery = ref("");
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
  searchQuery.value = "";
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.search-container {
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow);

  .search-bar {
    display: flex;
    align-items: center;
    max-width: 400px;
    flex-grow: 1;
    margin-bottom: 15px;
  }

  .search-results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;

    .result-item {
      border-radius: 10px;
      padding: 12px;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-4px);
      }

      img {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 8px;
        object-fit: cover;
      }

      .result-info {
        h3 {
          font-size: 1.1rem;
          color: var(--primary-color);
          margin-bottom: 4px;
        }

        p {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 8px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .container {
    flex-wrap: wrap;
    gap: 12px;
  }
  .search-bar {
    margin: 0;
    width: 100%;
    max-width: none;
  }
}

@media (max-width: 768px) {
  .search-results {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
