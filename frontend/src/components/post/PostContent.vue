<template>
  <div class="post-content">
    <h3>{{ post.title }}</h3>
    <p>{{ post.description }}</p>

    <div class="post-content-options">
      <VaIcon name="favorite" color="white" ></VaIcon>

      <VaButton
        preset="plain"
        color="primary"
        class="toggle-comments"
        @click="postStore.toggleComments(post.id)"
      >
        {{
          post.showComments
            ? $t("app.hideComments")
            : $t("app.comments") + ` (${post.comments.length})`
        }}
      </VaButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VaButton } from "vuestic-ui";
import { usePostStore } from "../../stores/post";
import { type Post } from "../../stores/post";

defineProps<{
  post: Post;
}>();

const postStore = usePostStore();
</script>

<style lang="scss" scoped>
.post-content {
  &-options {
    display: flex;
    gap: 10px;
  }

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
</style>
