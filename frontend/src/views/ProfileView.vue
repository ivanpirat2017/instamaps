<template>
  <div class="profile-page container">
    <div v-if="profileUser" class="profile-content">
      <div class="profile-header">
        <ProfileCard :user="profileUser" />

        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-value">{{ profileUser.followers }}</span>
            <span class="stat-label">{{ $t("app.followers") }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ profileUser.following }}</span>
            <span class="stat-label">{{ $t("app.following") }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ userPosts.length }}</span>
            <span class="stat-label">{{ $t("app.posts") }}</span>
          </div>
        </div>

        <div class="profile-actions" v-if="profileUser.username !== authStore.user?.username">
          <VaButton color="primary" class="follow-button">
            {{ $t("app.follow") }}
          </VaButton>
        </div>
      </div>

      <div class="profile-tabs">
        <VaTabs v-model="activeTab">
          <VaTab name="photos">{{ $t("app.photos") }}</VaTab>
          <VaTab name="map">{{ $t("app.map") }}</VaTab>
        </VaTabs>
      </div>

      <div class="profile-content">
        <PhotoGrid v-if="activeTab === 'photos'" :posts="userPosts" />
        <MapContainer v-else :selected-post="selectedPost" @update-selected="onPostSelect" />
      </div>
    </div>
    <div v-else class="not-found">
      <VaIcon name="person_off" size="large" />
      <h2>{{ $t("app.userNotFound") }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VaButton, VaTabs, VaTab, VaIcon } from "vuestic-ui";
import { useAuthStore } from "../stores/auth";
import { usePostStore } from "../stores/post";
import ProfileCard from "../components/profile/ProfileCard.vue";
import PhotoGrid from "../components/profile/PhotoGrid.vue";
import MapContainer from "../components/map/MapContainer.vue";
import type { Post } from "../stores/post";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const postStore = usePostStore();
const activeTab = ref("photos");
const selectedPost = ref<Post | null>(null);

const username = computed(() => route.params.username?.toString() || authStore.user?.username);
const profileUser = computed(() => {
  if (!username.value) return null;
  return authStore.getUserByUsername(username.value);
});

const userPosts = computed(() => {
  return postStore.posts.filter((post) => post.user === profileUser.value?.username);
});

function onPostSelect(post: Post) {
  selectedPost.value = post;
}

onMounted(() => {
  if (!username.value && !authStore.isAuthenticated) {
    // Редирект на страницу входа, если пользователь не авторизован
    router.push("/auth");
  }
});
</script>

<style scoped lang="scss">
.profile-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  display: grid;
  gap: 24px;
  margin-bottom: 32px;
}

.profile-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 16px;
  background: var(--white-transparent);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.stat-item {
  text-align: center;

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--primary-color);
    opacity: 0.8;
  }
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.profile-tabs {
  margin-bottom: 24px;
}

.not-found {
  text-align: center;
  padding: 48px;
  color: var(--primary-color);

  h2 {
    margin-top: 16px;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 16px;
  }

  .profile-stats {
    gap: 24px;
  }
}
</style>
