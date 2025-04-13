<template>
  <div class="post" v-if="post" role="article">
    <PostImage :src="post.image" :alt="post.title" />
    <PostContent :post="post" />
    <CommentsSection :post="post" />
  </div>
  <div v-else class="post skeleton" style="height: 400px"></div>
</template>

<script setup lang="ts">
import PostImage from "./post/PostImage.vue";
import PostContent from "./post/PostContent.vue";
import CommentsSection from "./post/CommentsSection.vue";
import { type Post } from "../stores/post";

defineProps<{
  post?: Post;
}>();
</script>
