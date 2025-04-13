<template>
  <section class="photo-grid">
    <img
      v-for="post in posts"
      :key="post.id"
      v-lazy="post.image"
      :alt="post.title"
      loading="lazy"
      decoding="async"
    />
  </section>
</template>

<script setup lang="ts">
import {type Post } from '../../stores/post';

defineProps<{
  posts: Post[];
}>();
</script>