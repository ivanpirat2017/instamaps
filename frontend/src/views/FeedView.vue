<template>
  <main class="container">
    <section class="feed"  v-if="isLoading">
      <PostCard v-for="n in 3"  :key="'skeleton-' + n" />
    </section>
    <section class="feed" v-else>
      <PostCard v-for="post in postStore.posts" :key="post.id" :post="post" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { usePostStore } from '../stores/post';
import { onMounted, ref } from 'vue';
import PostCard from '../components/PostCard.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const postStore = usePostStore();
const isLoading = ref(false);
const error = ref('');

onMounted(async () => {
  isLoading.value = true;
  try {
    await postStore.fetchPosts();
  } catch (err) {
    error.value = t('app.fetchPostsError');
  } finally {
    isLoading.value = false;
  }
});
</script>