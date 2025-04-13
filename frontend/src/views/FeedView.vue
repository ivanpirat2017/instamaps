<template>
  <main class="container">
    <section class="feed">
      <div class="post" v-for="post in postStore.posts" :key="post.id">
        <img :src="post.image" :alt="post.title" />
        <div class="post-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <button class="toggle-comments" @click="postStore.toggleComments(post.id)">
            {{ post.showComments ? "Скрыть комментарии" : `Комментарии (${post.comments.length})` }}
          </button>
          <div class="comments" v-if="post.showComments">
            <p v-for="comment in post.comments" :key="comment.id">
              <strong>{{ comment.user }}:</strong> {{ comment.text }}
            </p>
            <div class="add-comment" v-if="authStore.isAuthenticated">
              <input v-model="post.newComment" placeholder="Ваш комментарий..." />
              <button @click="postStore.addComment(post.id, authStore.user?.username || 'user')">
                Отправить
              </button>
            </div>
            <p v-else class="text-gray-500 text-sm">Войдите, чтобы оставить комментарий</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { usePostStore } from "../stores/post";
import { useAuthStore } from "../stores/auth";
import { onMounted } from "vue";

const postStore = usePostStore();
const authStore = useAuthStore();

onMounted(() => {
  postStore.fetchPosts();
});
</script>
