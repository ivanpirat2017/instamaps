<template>
  <div class="result-item">
    <div class="image-container" @click="openImage">
      <img
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      />
      <div class="image-overlay">
        <VaIcon name="visibility" color="white" />
        <span>{{ $t("app.open") }}</span>
      </div>
    </div>
    <div class="result-info" @click="goToPost">
      <div class="info-header">
        <h3>{{ post.title }}</h3>
        <VaButton preset="plain" icon="favorite_border" class="like-button" color="primary" />
      </div>
      <div class="meta-info">
        <span class="user">@{{ post.user }}</span>
        <span class="comments" v-if="post.comments">
          <VaIcon name="chat_bubble_outline" size="small" />
          {{ post.comments.length }}
        </span>
      </div>
      <div class="result-tags" v-if="post.tags && post.tags.length">
        <VaChip
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          size="small"
          color="secondary"
          class="tag"
        >
          {{ tag }}
        </VaChip>
      </div>
    </div>
    <FullscreenImage v-model="isFullscreen" :src="post.image" :alt="post.title" />
  </div>
</template>

<script setup lang="ts">
import { VaIcon, VaButton, VaChip } from "vuestic-ui";
import { type Post } from "../../stores/post";
import { ref } from "vue";
import { useRouter } from "vue-router";
import FullscreenImage from "../common/FullscreenImage.vue";

const props = defineProps<{
  post: Post;
}>();

const router = useRouter();
const isFullscreen = ref(false);

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.jpg";
}

function openImage() {
  isFullscreen.value = true;
}

function goToPost() {
  router.push(`/post/${props.post.id}`);
}
</script>

<style scoped lang="scss">
.result-item {
  display: block;
  text-decoration: none;
  background: var(--va-background-primary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--va-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--va-shadow-lg);

    .image-overlay {
      opacity: 1;
    }
  }
}

.image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: var(--va-background-secondary);
  border-radius: 12px 12px 0 0;

  @media (max-width: 768px) {
    height: 220px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;

  span {
    margin-top: 8px;
    font-size: 14px;
  }
}

.result-info {
  padding: 16px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;

  h3 {
    margin: 0;
    font-size: 16px;
    color: var(--va-text-primary);
    font-weight: 600;
  }
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: var(--va-text-secondary);
  font-size: 14px;

  .comments {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .tag {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .result-item {
    border-radius: 8px;
  }

  .result-info {
    padding: 12px;
  }
}
</style>
