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
import { VaChip } from "vuestic-ui";
import { type Post } from "../../stores/post";

defineProps<{
  post: Post;
}>();
</script>

<style scoped>
.result-item {
  border-radius: 10px;
  padding: 12px;
  transition: transform 0.3s;
}

.result-item:hover {
  transform: translateY(-4px);
}

.result-item img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
  object-fit: cover;
}

.result-info h3 {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.result-info p {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 8px;
}

.result-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
