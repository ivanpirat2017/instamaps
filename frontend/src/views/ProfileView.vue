<template>
  <main class="container">
    <section class="profile-card">
      <img src="https://via.placeholder.com/120" alt="Аватар" />
      <h2>@{{ user?.username || "traveler" }}</h2>
      <p>Люблю природу и фотографию. Исследую мир!</p>
      <div class="tags">
        <span>#природа</span>
        <span>#путешествия</span>
        <span>#фото</span>
      </div>
    </section>
    <section class="photo-grid">
      <img v-for="post in userPosts" :key="post.id" :src="post.image" :alt="post.title" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { usePostStore } from "../stores/post";

const authStore = useAuthStore();
const postStore = usePostStore();

const user = computed(() => authStore.user);
const userPosts = computed(() =>
  postStore.posts.filter((post) => post.user === user.value?.username)
);
</script>
