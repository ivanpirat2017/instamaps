<template>
  <div class="photo-grid">
    <div v-if="posts.length === 0" class="no-photos">
      <VaIcon name="image_not_supported" size="large" />
      <p>{{ $t("app.noPhotosYet") }}</p>
    </div>
    <div v-else class="grid">
      <RouterLink
        v-for="post in posts"
        :key="post.id"
        :to="{ name: 'post', params: { id: post.id } }"
        class="grid-item"
      >
        <div class="image-container">
          <img
            :src="post.imageUrl"
            :alt="post.description"
            loading="lazy"
            decoding="async"
            class="post-image"
          />
          <div class="overlay">
            <div class="stats">
              <span class="stat">
                <VaIcon name="favorite" />
                {{ post.likes }}
              </span>
              <span class="stat">
                <VaIcon name="comment" />
                {{ post.comments?.length || 0 }}
              </span>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VaIcon } from "vuestic-ui";
import type { Post } from "../../stores/post";

defineProps<{
  posts: Post[];
}>();
</script>

<style scoped lang="scss">
.photo-grid {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.grid-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);

    .overlay {
      opacity: 1;
    }
  }
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.stats {
  display: flex;
  gap: 24px;
  color: white;
  font-size: 1.1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.no-photos {
  text-align: center;
  padding: 48px;
  color: var(--primary-color);
  background: var(--white-transparent);
  border-radius: 12px;
  box-shadow: var(--shadow);

  .va-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
}
</style>
