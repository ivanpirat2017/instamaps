<template>
  <div class="comments" v-if="post.showComments">
    <p v-for="comment in post.comments" :key="comment.id">
      <strong>{{ comment.user }}:</strong> {{ comment.text }}
    </p>
    <AddComment :post="post" v-if="authStore.isAuthenticated" />
    <p v-else class="text-gray-500 text-sm">{{ $t("app.loginToComment") }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import AddComment from "./AddComment.vue";
import { type Post } from "../../stores/post";
 
defineProps<{
  post: Post;
}>();

const authStore = useAuthStore();
</script>
