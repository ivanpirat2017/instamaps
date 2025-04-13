<template>
  <div class="add-comment">
    <VaInput v-model="post.newComment" :placeholder="$t('app.addComment')" class="flex-grow" />
    <VaButton
      @click="postStore.addComment(post.id, authStore.user?.username || 'user')"
      :disabled="!post.newComment.trim()"
    >
      {{ $t("app.submit") }}
    </VaButton>
  </div>
</template>

<script setup lang="ts">
import { VaInput, VaButton } from "vuestic-ui";
import { usePostStore } from "../../stores/post";
import { useAuthStore } from "../../stores/auth";
import { type Post } from "../../stores/post";
 
defineProps<{
  post: Post;
}>();

const postStore = usePostStore();
const authStore = useAuthStore();
</script>

<style scoped>
.add-comment {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
