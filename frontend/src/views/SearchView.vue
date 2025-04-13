<template>
  <main class="container">
    <section class="search-container mb-4">
      <h2>Поиск фотографий</h2>
      <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Поиск: закат на пляже..." />
        <button @click="search">Найти</button>
      </div>
    </section>
    <section class="search-container">
      <div class="filter-tags">
        <span
          v-for="tag in tags"
          :key="tag"
          class="tag"
          :class="{ active: activeTag === tag }"
          @click="filterByTag(tag)"
        >
          {{ tag }}
        </span>
      </div>
      <div class="search-results">
        <div class="result-item" v-for="post in filteredPosts" :key="post.id">
          <img :src="post.image" :alt="post.title" />
          <div class="result-info">
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}, @{{ post.user }}</p>
            <div class="result-tags">
              <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePostStore } from "../stores/post";

const postStore = usePostStore();
const searchQuery = ref("");
const activeTag = ref<string | null>(null);

const tags = computed(() => {
  const allTags = new Set<string>();
  postStore.posts.forEach((post) => {
    post.tags?.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
});

const filteredPosts = computed(() => {
  let filtered = postStore.posts;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (activeTag.value) {
    filtered = filtered.filter((post) => post.tags?.includes(activeTag.value!));
  }

  return filtered;
});

function search() {
  activeTag.value = null;
}

function filterByTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag;
  searchQuery.value = "";
}
</script>
