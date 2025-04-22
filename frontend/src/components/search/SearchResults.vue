<template>
  <TransitionGroup name="results-grid" tag="div" class="search-results">
    <ResultItem v-for="post in posts" :key="post.id" :post="post" class="result-item-wrapper" />
    <div v-if="!posts.length" class="no-results" key="no-results">
      <VaIcon name="search_off" size="large" />
      <p>Ничего не найдено</p>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import ResultItem from "./ResultItem.vue";
import { VaIcon } from "vuestic-ui";
import { type Post } from "../../stores/post";

defineProps<{
  posts: Post[];
}>();
</script>

<style scoped lang="scss">
.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  position: relative;
  min-height: 200px;
}

.result-item-wrapper {
  min-height: 100%;
}

.no-results {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--primary-color);
  opacity: 0.7;

  p {
    margin-top: 12px;
    font-size: 1.1rem;
  }
}

/* Анимации для сетки результатов */
.results-grid-move,
.results-grid-enter-active,
.results-grid-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.results-grid-enter-from,
.results-grid-leave-to {
  opacity: 0;
  transform: scale(0.8);
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
