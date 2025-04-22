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

    <PostImage :src="post.imageUrl" :alt="post.title || ''" />

    <div class="post-content">
      <h3>{{ post.title }}</h3>
      <p class="description">{{ post.description }}</p>

      <div class="tags" v-if="post.tags && post.tags.length">
        <VaChip v-for="tag in post.tags" :key="tag" color="primary" class="tag" size="small">
          #{{ tag }}
        </VaChip>
      </div>

      <div class="post-actions">
        <button class="action-button" @click="handleLike" v-if="authStore.isAuthenticated">
          <VaIcon
            :name="isLiked ? 'favorite' : 'favorite_border'"
            :color="isLiked ? 'danger' : ''"
          />
          {{ post.likes }}
        </button>
        <button class="action-button" @click="handleComment">
          <VaIcon name="comment" />
          {{ post.comments?.length || 0 }}
        </button>
        <RouterLink :to="{ name: 'post', params: { id: post.id } }" class="action-button">
          <VaIcon name="open_in_new" />
          {{ $t("app.open") }}
        </RouterLink>
      </div>
    </div>

    <div v-if="showComments && post" class="comments-section">
      <CommentsSection :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { VaIcon, VaChip } from "vuestic-ui";
import { useAuthStore } from "../stores/auth";
import { usePostStore } from "../stores/post";
import PostImage from "./post/PostImage.vue";
import CommentsSection from "./post/CommentsSection.vue";
import type { Post } from "../stores/post";

const authStore = useAuthStore();
const postStore = usePostStore();

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
  if (authStore.isAuthenticated && authStore.user) {
    postStore.toggleLike(props.post.id, authStore.user.id);
    isLiked.value = !isLiked.value;
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
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: inherit;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    color: var(--primary-color);
    transform: translateY(-2px);
  }
}

.comments-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}
</style>
