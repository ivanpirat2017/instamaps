<template>
  <section class="photo-grid">
    <div v-for="post in posts" :key="post.id" class="photo-item">
      <img v-lazy="post.image" :alt="post.title" loading="lazy" decoding="async" />
      <div class="photo-caption">
        <span>{{ post.title }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Post } from "../../stores/post";

defineProps<{
  posts: Post[];
}>();
</script>

<style scoped>
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 18px;
  padding: 8px 0;
}
.photo-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  background: #fff;
  transition: box-shadow 0.2s;
}
.photo-item:hover {
  box-shadow: 0 6px 24px rgba(79, 70, 229, 0.18);
  z-index: 2;
}
.photo-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  transition: transform 0.25s;
}
.photo-item:hover img {
  transform: scale(1.04);
}
.photo-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.55) 60%, transparent 100%);
  color: #fff;
  font-size: 0.98rem;
  padding: 8px 12px 6px 12px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  pointer-events: none;
}
@media (max-width: 600px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  .photo-item img {
    height: 110px;
  }
}
</style>
