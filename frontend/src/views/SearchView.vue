<template>
  <main class="container">
    <section class="search-header">
      <h2 class="search-title">{{ $t("app.searchPhotos") }}</h2>
      <SearchBar v-model="searchQuery" @search="search" />
    </section>

    <section class="search-content">
      <div class="search-filters">
        <h3 class="filters-title">Фильтры</h3>
        <FilterTags v-model="activeTag" :tags="tags" @filter="filterByTag" />
      </div>

      <div class="search-results-wrapper">
        <div class="results-header">
          <h3 class="results-title">Результаты ({{ filteredPosts.length }})</h3>
          <div class="results-sort">
            <VaButton
              preset="plain"
              :color="sortBy === 'date' ? 'primary' : 'secondary'"
              @click="sortBy = 'date'"
            >
              <VaIcon name="schedule" />
              По дате
            </VaButton>
            <VaButton
              preset="plain"
              :color="sortBy === 'popular' ? 'primary' : 'secondary'"
              @click="sortBy = 'popular'"
            >
              <VaIcon name="favorite" />
              Популярные
            </VaButton>
          </div>
        </div>
        <SearchResults :posts="sortedPosts" />
      </div>
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
import { VaButton, VaIcon } from "vuestic-ui";

const { t } = useI18n();
const postStore = usePostStore();
const searchQuery = ref("");
const activeTag = ref<string | null>(null);
const sortBy = ref<"date" | "popular">("date");

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

const sortedPosts = computed(() => {
  const posts = [...filteredPosts.value];
  if (sortBy.value === "popular") {
    return posts.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
  }
  return posts.reverse(); // По умолчанию сортируем по дате (id) в обратном порядке
});

function search() {
  activeTag.value = null;
}

function filterByTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag;
  searchQuery.value = "";
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.search-header {
  margin-bottom: 24px;

  .search-title {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 16px;
  }
}

.search-content {
  display: grid;
  gap: 24px;
  grid-template-columns: 250px 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.search-filters {
  background: var(--white-transparent);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow);
  height: fit-content;

  .filters-title {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 16px;
  }
}

.search-results-wrapper {
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .results-title {
      font-size: 1.2rem;
      color: var(--primary-color);
    }

    .results-sort {
      display: flex;
      gap: 8px;
    }
  }
}

@media (max-width: 768px) {
  .search-header {
    .search-title {
      font-size: 1.5rem;
    }
  }

  .results-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
