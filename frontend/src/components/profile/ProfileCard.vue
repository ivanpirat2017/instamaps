<template>
  <section class="profile-card">
    <VaAvatar
      :src="user?.avatar || 'https://via.placeholder.com/120'"
      size="large"
      class="profile-avatar"
    />
    <h2>@{{ user?.username || "traveler" }}</h2>
    <p>{{ user?.bio || $t("app.profileBio") }}</p>
    <div class="tags">
      <VaChip v-for="tag in profileTags" :key="tag" color="primary">#{{ tag }}</VaChip>
    </div>
  </section>
</template>

<script setup lang="ts">
import { VaAvatar, VaChip } from "vuestic-ui";
import { computed, toRefs } from "vue";
import { usePostStore } from "../../stores/post";

const props = defineProps<{
  user: { username: string; avatar?: string; bio?: string } | null;
}>();
const { user } = toRefs(props);

const postStore = usePostStore();
const profileTags = computed(() => {
  if (!postStore.posts || !user.value) return [];
  const tags = new Set<string>();
  postStore.posts.forEach((post) => {
    if (post.user === user.value.username && post.tags) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
});
</script>

<style scoped>
.profile-card {
  border-radius: 16px;
  padding: 32px 24px 24px 24px;
  box-shadow: var(--shadow);
  text-align: center;
  margin-bottom: 24px;
  background: var(--white-transparent);
  position: relative;
  overflow: visible;
}
.profile-avatar {
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.12);
  border: 3px solid var(--accent-color);
}
.profile-card h2 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 8px;
}
.profile-card p {
  font-size: 1.05rem;
  color: #6b7280;
  margin-bottom: 18px;
}
.tags {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
