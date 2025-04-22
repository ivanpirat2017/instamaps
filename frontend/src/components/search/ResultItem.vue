<template>
  <router-link :to="`/post/${post.id}`" class="result-item">
    <div class="image-container">
      <img v-lazy="post.image" :alt="post.title" loading="lazy" decoding="async" />
      <div class="image-overlay">
        <VaIcon name="visibility" color="white" />
        <span>Открыть</span>
      </div>
    </div>
    <div class="result-info">
      <div class="info-header">
        <h3>{{ post.title }}</h3>
        <VaButton preset="plain" icon="favorite_border" class="like-button" color="primary" />
      </div>
      <div class="meta-info">
        <span class="user">@{{ post.user }}</span>
        <span class="comments">
          <VaIcon name="chat_bubble_outline" size="small" />
          {{ post.comments.length }}
        </span>
      </div>
      <div class="result-tags">
        <VaChip v-for="tag in post.tags" :key="tag" size="small" color="secondary" class="tag">
          #{{ tag }}
        </VaChip>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { VaChip, VaIcon, VaButton } from "vuestic-ui";
import { type Post } from "../../stores/post";

defineProps<{
  post: Post;
}>();
</script>

<style scoped lang="scss">
.result-item {
  background: var(--white-transparent);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(79, 70, 229, 0.15);

    .image-overlay {
      opacity: 1;
    }

    img {
      transform: scale(1.05);
    }
  }
}

.image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 0.9rem;
}

.result-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;

  h3 {
    font-size: 1.1rem;
    color: var(--primary-color);
    font-weight: 600;
    line-height: 1.3;
    flex: 1;
  }
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: var(--primary-color);

  .user {
    color: var(--accent-color);
    font-weight: 500;
  }

  .comments {
    display: flex;
    align-items: center;
    gap: 4px;
    opacity: 0.8;
  }
}

.result-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: auto;
}

.tag {
  font-size: 0.8rem;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.like-button {
  opacity: 0.7;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
}
</style>
