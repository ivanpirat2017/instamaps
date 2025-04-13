<template>
  <div class="result-item">
    <img v-lazy="post.image" :alt="post.title" loading="lazy" decoding="async" />
    <div class="result-info">
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}, @{{ post.user }}</p>
      <div class="result-tags">
        <VaChip v-for="tag in post.tags" :key="tag" size="small" color="primary">
          #{{ tag }}
        </VaChip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VaChip } from 'vuestic-ui';
import {type Post } from '../../stores/post';

defineProps<{
  post: Post;
}>();
</script>