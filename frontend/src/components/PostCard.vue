<template>
  <div class="post-card">
    <div class="post-header">
      <RouterLink :to="{ name: 'profile', params: { username: post.user } }" class="user-info">
        <img :src="userAvatar" :alt="post.user" class="user-avatar" />
        <span class="username">{{ post.user }}</span>
      </RouterLink>
      <span class="location">
        <VaIcon name="location_on" />
        {{ post.location.name }}
      </span>
    </div>

    <PostImage :src="post.imageUrl" :alt="post.description" />

    <div class="post-actions">
      <button class="action-button" @click="handleLike">
        <VaIcon name="favorite" :color="isLiked ? 'danger' : ''" />
        {{ post.likes }}
      </button>
      <button class="action-button" @click="handleComment">
        <VaIcon name="comment" />
        {{ post.comments?.length || 0 }}
      </button>
    </div>

    <p class="description">{{ post.description }}</p>

    <div v-if="showComments" class="comments-section">
      <CommentsSection :post-id="post.id" :comments="post.comments" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { VaIcon } from "vuestic-ui";
import { useAuthStore } from "../stores/auth";
import PostImage from "./post/PostImage.vue";
import CommentsSection from "./post/CommentsSection.vue";
import type { Post } from "../stores/post";

const authStore = useAuthStore();

const props = defineProps<{
  post: Post;
}>();

const showComments = ref(false);
const isLiked = ref(false);

const userAvatar = computed(() => {
  const user = authStore.getUserByUsername(props.post.user);
  return user?.avatar || `https://api.dicebear.com/7.x/avatars/svg?seed=${props.post.user}`;
});

function handleLike() {
  // Здесь будет логика лайка
}

function handleComment() {
  showComments.value = !showComments.value;
}
</script>

<style scoped lang="scss">
.post-card {
  background: var(--white-transparent);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: var(--shadow);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;

  &:hover {
    .username {
      color: var(--primary-color);
    }
  }
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: 600;
  transition: color 0.2s;
}

.location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  color: var(--primary-color);
  opacity: 0.8;
}

.post-actions {
  display: flex;
  gap: 16px;
  margin: 12px 0;
}

.action-button {
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: inherit;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color);
  }
}

.description {
  margin: 12px 0;
  line-height: 1.5;
}

.comments-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}
</style>
