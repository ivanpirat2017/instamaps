<template>
  <div class="search-results">
    <ResultItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import ResultItem from './ResultItem.vue';
import { type Post } from '../../stores/post';

defineProps<{
  posts: Post[];
}>();
</script>