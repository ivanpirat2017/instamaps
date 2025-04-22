<template>
  <div class="comments-section">
    <div v-if="post.comments && post.comments.length > 0" class="comments-list">
      <div v-for="comment in post.comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <RouterLink
            :to="{ name: 'profile', params: { username: comment.user } }"
            class="comment-user"
          >
            {{ comment.user }}
          </RouterLink>
          <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
        </div>
        <p class="comment-text">{{ comment.text }}</p>
      </div>
    </div>
    <div v-else class="no-comments">
      <p>{{ $t("app.noComments") }}</p>
    </div>

    <AddComment v-if="authStore.isAuthenticated" :post="post" />
    <div v-else class="login-prompt">
      <p>{{ $t("app.loginToComment") }}</p>
      <RouterLink to="/auth" class="login-link">
        <VaButton preset="primary" size="small">
          {{ $t("app.login") }}
        </VaButton>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VaButton } from "vuestic-ui";
import { useAuthStore } from "../../stores/auth";
import AddComment from "./AddComment.vue";
import { type Post } from "../../stores/post";

defineProps<{
  post: Post;
}>();

const authStore = useAuthStore();

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateString));
}
</script>

<style scoped lang="scss">
.comments-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment {
  padding: 12px;
  background: var(--white-transparent);
  border-radius: 8px;

  &:hover {
    background: rgba(var(--va-primary-rgb), 0.05);
  }
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.comment-user {
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.comment-date {
  font-size: 0.85rem;
  color: var(--primary-color);
  opacity: 0.7;
}

.comment-text {
  color: var(--primary-color);
  line-height: 1.4;
}

.no-comments {
  text-align: center;
  padding: 16px;
  color: var(--primary-color);
  opacity: 0.7;
}

.login-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  text-align: center;

  p {
    color: var(--primary-color);
    opacity: 0.8;
  }
}

.login-link {
  text-decoration: none;
}
</style>
