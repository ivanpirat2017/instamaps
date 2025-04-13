<template>
  <div class="post-content">
    <h3>{{ post.title }}</h3>
    <p>{{ post.description }}</p>
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
