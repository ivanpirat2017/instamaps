<template>
  <main class="container">
    <ProfileCard :user="user" />
    <PhotoGrid :posts="userPosts" />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { usePostStore } from "../stores/post";
import ProfileCard from "../components/profile/ProfileCard.vue";
import PhotoGrid from "../components/profile/PhotoGrid.vue";

const authStore = useAuthStore();
const postStore = usePostStore();

const user = computed(() => authStore.user);
const userPosts = computed(() =>
  postStore.posts.filter((post) => post.user === user.value?.username)
);
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}
</style>
