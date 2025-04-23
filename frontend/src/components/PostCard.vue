<template>
  <div class="post-card" v-if="post">
    <div class="post-header">
      <RouterLink
        :to="{ name: 'profile', params: { username: post.user } }"
        class="user-info"
        v-if="post.user"
      >
        <img :src="userAvatar" :alt="post.user" class="user-avatar" />
        <span class="username">{{ post.user }}</span>
      </RouterLink>
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.createdAt) }}</span>
        <span class="location" v-if="post.location?.name">
          <VaIcon name="location_on" />
          {{ post.location.name }}
        </span>
      </div>
    </div>

    <PostImage :src="post.image" :alt="post.title || ''" />

    <div class="post-content">
      <h3>{{ post.title }}</h3>
      <p class="description">{{ post.description }}</p>

      <div class="tags" v-if="post.tags && post.tags.length">
        <VaChip v-for="tag in post.tags" :key="tag" color="primary" class="tag" size="small">
          #{{ tag }}
        </VaChip>
      </div>

      <div class="post-actions">
        <button 
          class="action-button like-button"
          @click="handleLike"
          :class="{ 'liked': isLiked }"
          v-if="authStore.isAuthenticated"
        >
          <VaIcon
            :name="isLiked ? 'favorite' : 'favorite_border'"
            :color="isLiked ? 'danger' : ''"
            class="like-icon"
          />
          <span class="like-count">{{ post.likesCount }}</span>
        </button>
        <button class="action-button" @click="handleComment">
          <VaIcon name="comment" />
          <span>{{ post.comments?.length || 0 }}</span>
        </button>
        <RouterLink :to="{ name: 'post', params: { id: post.id } }" class="action-button">
          <VaIcon name="open_in_new" />
          <span>{{ $t("app.open") }}</span>
        </RouterLink>
      </div>
    </div>

    <div v-if="showComments && post" class="comments-section">
      <CommentsSection :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { VaIcon, VaChip } from "vuestic-ui";
import { useAuthStore } from "../stores/auth";
import { usePostStore } from "../stores/post";
import { showToast } from "../utils/toast";
import PostImage from "./post/PostImage.vue";
import CommentsSection from "./post/CommentsSection.vue";
import type { Post } from "../stores/post";

const authStore = useAuthStore();
const postStore = usePostStore();

const props = defineProps<{
  post: Post;
}>();

const showComments = ref(false);
const isAnimating = ref(false);

const isLiked = computed(() => {
  if (!authStore.user) return false;
  return postStore.isLiked(props.post.id, authStore.user.id);
});

const userAvatar = computed(() => {
  const user = authStore.getUserByUsername(props.post.user);
  return user?.avatar || `https://api.dicebear.com/7.x/avatars/svg?seed=${props.post.user}`;
});

async function handleLike() {
  if (!authStore.isAuthenticated || !authStore.user) {
    showToast("Войдите, чтобы поставить лайк", "info");
    return;
  }

  if (isAnimating.value) return;

  isAnimating.value = true;
  try {
    await postStore.toggleLike(props.post.id, authStore.user.id);
  } catch (error) {
    showToast("Не удалось обновить лайк", "error");
  } finally {
    isAnimating.value = false;
  }
}

function handleComment() {
  showComments.value = !showComments.value;
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
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

.post-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.post-date {
  font-size: 0.9rem;
  color: var(--primary-color);
  opacity: 0.7;
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

.post-content {
  margin-top: 12px;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 8px;
  }
}

.description {
  margin: 12px 0;
  line-height: 1.5;
  color: var(--primary-color);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}

.post-actions {
  display: flex;
  gap: 16px;
  margin: 12px 0;
  border-top: 1px solid var(--border-color);
  padding-top: 12px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--va-text-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--va-background-secondary);
    transform: translateY(-2px);
  }

  .va-icon {
    font-size: 20px;
  }
}

.like-button {
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.liked {
    transform: scale(1.1);
  }

  .like-icon {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover .like-icon {
    transform: scale(1.2);
  }

  &.liked .like-icon {
    animation: likeAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

@keyframes likeAnimation {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

.like-count {
  min-width: 20px;
  text-align: center;
}

.comments-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}
</style>
