<template>
  <main class="container">
    <section class="feed" v-if="isLoading">
      <PostCard v-for="n in 3" :key="'skeleton-' + n" />
    </section>
    <section class="feed" v-else>
      <PostCard v-for="post in postStore.posts" :key="post.id" :post="post" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { usePostStore } from "../stores/post";
import { onMounted, ref } from "vue";
import PostCard from "../components/PostCard.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const postStore = usePostStore();
const isLoading = ref(false);
const error = ref("");

onMounted(async () => {
  isLoading.value = true;
  try {
    await postStore.fetchPosts();
  } catch (err) {
    error.value = t("app.fetchPostsError");
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

main {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.result-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
