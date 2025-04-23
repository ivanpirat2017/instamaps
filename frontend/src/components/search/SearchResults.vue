<template>
  <div class="search-results-container">
    <TransitionGroup
      name="results-grid"
      tag="div"
      class="search-results"
      v-if="posts && posts.length > 0"
    >
      <ResultItem
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        class="result-item-wrapper"
      />
    </TransitionGroup>

    <div v-else class="no-results">
      <VaIcon name="search_off" size="large" />
      <p>{{ $t("app.noResults") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ResultItem from "./ResultItem.vue";
import { VaIcon } from "vuestic-ui";
import { type Post } from "../../stores/post";

const props = defineProps<{
  query?: string;
  selectedTags?: string[];
  posts: Post[];
}>();

const filteredPosts = computed(() => {
  if (!props.posts) return [];

  let filtered = [...props.posts];

  if (props.query) {
    const searchQuery = props.query.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.description?.toLowerCase().includes(searchQuery) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
  }

  if (props.selectedTags && props.selectedTags.length > 0) {
    filtered = filtered.filter((post) =>
      post.tags?.some((tag) => props.selectedTags?.includes(tag))
    );
  }

  return filtered;
});
</script>

<style scoped lang="scss">
.search-results-container {
  min-height: 400px;
  position: relative;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  position: relative;
}

.result-item-wrapper {
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.no-results {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--va-text-secondary);

  .va-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.7;
  }

  p {
    font-size: 1.1rem;
  }
}

/* Анимации */
.results-grid-move,
.results-grid-enter-active,
.results-grid-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.results-grid-enter-from,
.results-grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.results-grid-leave-active {
  position: absolute;
}

@media (max-width: 768px) {
  .search-results {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
}
</style>
