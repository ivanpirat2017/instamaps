<template>
  <div class="post" v-if="post" role="article">
    <PostImage :src="post.image" :alt="post.title" />
    <PostContent :post="post" />
    <CommentsSection :post="post" />
  </div>
  <div v-else class="post skeleton" style="height: 400px"></div>
</template>

<script setup lang="ts">
import PostImage from "./post/PostImage.vue";
import PostContent from "./post/PostContent.vue";
import CommentsSection from "./post/CommentsSection.vue";
import { type Post } from "../stores/post";

defineProps<{
  post?: Post;
}>();
</script>

<style scoped>
.post {
  border-radius: 12px;
  padding: 12px;
  box-shadow: var(--shadow);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
    object-fit: cover;
  }

  .post-content {
    h3 {
      font-size: 1.2rem;
      color: var(--primary-color);
      margin-bottom: 4px;
    }

    p {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 8px;
    }
  }

  .comments {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--border-color);

    p {
      font-size: 0.85rem;
      color: #6b7280;
      margin-bottom: 6px;
    }
  }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
