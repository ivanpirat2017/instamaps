<template>
  <main class="container">
    <Transition name="page" mode="out-in">
      <section v-if="post" class="post-view">
        <div class="post-content">
          <RouterLink to="/search" class="back-button">
            <VaIcon name="arrow_back" />
            <span>Назад к поиску</span>
          </RouterLink>
          <PostCard :post="post" />
          <div class="post-meta">
            <div class="meta-header">
              <h2>{{ post.title }}</h2>
              <div class="meta-actions">
                <VaButton preset="plain" icon="share" color="primary" class="action-button" />
                <VaButton
                  preset="plain"
                  icon="favorite_border"
                  color="primary"
                  class="action-button"
                />
              </div>
            </div>
            <div class="meta-tags">
              <VaChip v-for="tag in post.tags" :key="tag" color="primary" class="tag" size="small">
                #{{ tag }}
              </VaChip>
            </div>
            <p class="location" v-if="post.location">
              <VaIcon name="place" />
              {{ post.location.lat.toFixed(4) }}, {{ post.location.lng.toFixed(4) }}
            </p>
          </div>
        </div>
        <div class="map-section">
          <div class="map-header">
            <h3 class="map-title">Расположение на карте</h3>
            <VaButton
              preset="plain"
              icon="fullscreen"
              @click="isMapFullscreen = !isMapFullscreen"
              class="fullscreen-button"
            />
          </div>
          <div :class="['map-container', { fullscreen: isMapFullscreen }]">
            <MapContainer :selected-post="post" />
          </div>
        </div>
      </section>
      <section v-else class="not-found">
        <div class="not-found-content">
          <VaIcon name="error" size="large" />
          <h2>Пост не найден</h2>
          <p>Возможно, он был удален или перемещен</p>
          <RouterLink to="/search" class="back-link">
            <VaButton>Вернуться к поиску</VaButton>
          </RouterLink>
        </div>
      </section>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "../stores/post";
import PostCard from "../components/PostCard.vue";
import MapContainer from "../components/map/MapContainer.vue";
import { VaIcon, VaChip, VaButton } from "vuestic-ui";

const route = useRoute();
const postStore = usePostStore();
const postId = computed(() => Number(route.params.id));
const post = computed(() => postStore.posts.find((p) => p.id === postId.value));
const isMapFullscreen = ref(false);

onMounted(async () => {
  if (!post.value) {
    await postStore.fetchPosts();
  }
});
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.post-view {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  animation: fade-in 0.5s ease;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.2s;

  &:hover {
    background: var(--white-transparent);
    transform: translateX(-4px);
  }
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-meta {
  background: var(--white-transparent);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow);

  .meta-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;

    h2 {
      font-size: 1.4rem;
      color: var(--primary-color);
      font-weight: 600;
    }

    .meta-actions {
      display: flex;
      gap: 8px;
    }
  }

  .meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
}

.location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--primary-color);
  font-size: 0.9rem;
  opacity: 0.8;
}

.map-section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .map-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .map-title {
      font-size: 1.2rem;
      color: var(--primary-color);
    }
  }
}

.map-container {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &.fullscreen {
    position: fixed;
    inset: 0;
    z-index: 1000;
    height: 100vh;
    border-radius: 0;
  }
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;

  .not-found-content {
    text-align: center;
    color: var(--primary-color);

    h2 {
      font-size: 1.5rem;
      margin: 16px 0 8px;
    }

    p {
      color: var(--primary-color);
      opacity: 0.7;
      margin-bottom: 20px;
    }
  }
}

.action-button {
  opacity: 0.7;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* Анимации страницы */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
