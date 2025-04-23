<template>
  <main class="container">
    <Transition name="page" mode="out-in">
      <div v-if="isLoading" class="loading-state">
        <VaSkeleton type="image" aspectRatio="16/9" class="mb-4" />
        <VaSkeleton type="text" :lines="3" class="mb-4" />
        <VaSkeleton type="text" :lines="2" />
      </div>

      <section v-else-if="error" class="error-state">
        <div class="error-content">
          <VaIcon name="error" size="large" />
          <h2>{{ t(error) }}</h2>
          <p>{{ t("app.tryAgainLater") }}</p>
          <div class="actions">
            <VaButton @click="fetchPost">
              {{ t("app.tryAgain") }}
            </VaButton>
            <RouterLink to="/search" class="back-link">
              <VaButton preset="secondary">
                {{ t("app.backToSearch") }}
              </VaButton>
            </RouterLink>
          </div>
        </div>
      </section>

      <section v-else-if="post" class="post-view">
        <div class="post-content">
          <RouterLink to="/search" class="back-button">
            <VaIcon name="arrow_back" />
            <span>{{ t("app.backToSearch") }}</span>
          </RouterLink>

          <PostCard :post="post" />

          <div class="post-meta">
            <div class="meta-header">
              <h2>{{ post.title }}</h2>
              <div class="meta-actions">
                <VaButton
                  preset="plain"
                  icon="share"
                  color="primary"
                  class="action-button"
                  @click="handleShare"
                />
                <VaButton
                  preset="plain"
                  :icon="isLiked ? 'favorite' : 'favorite_border'"
                  :color="isLiked ? 'danger' : 'primary'"
                  class="action-button like-button"
                  :class="{ liked: isLiked }"
                  @click="handleLike"
                  v-if="authStore.isAuthenticated"
                />
              </div>
            </div>

            <div class="meta-info">
              <div class="stats">
                <span class="stat">
                  <VaIcon name="favorite" />
                  {{ post.likesCount }}
                </span>
                <span class="stat">
                  <VaIcon name="comment" />
                  {{ post.comments.length }}
                </span>
                <span class="stat" v-if="post.views">
                  <VaIcon name="visibility" />
                  {{ post.views }}
                </span>
              </div>

              <div class="meta-tags" v-if="post.tags && post.tags.length">
                <VaChip
                  v-for="tag in post.tags"
                  :key="tag"
                  color="primary"
                  class="tag"
                  size="small"
                >
                  #{{ tag }}
                </VaChip>
              </div>
            </div>

            <div class="photo-info" v-if="post.metadata">
              <h3>{{ t("app.photoInfo") }}</h3>
              <div class="info-grid">
                <div v-if="post.metadata.camera" class="info-item">
                  <VaIcon name="camera" />
                  <span>{{ post.metadata.camera }}</span>
                </div>
                <div v-if="post.metadata.lens" class="info-item">
                  <VaIcon name="camera_enhance" />
                  <span>{{ post.metadata.lens }}</span>
                </div>
                <div v-if="post.metadata.settings" class="settings-grid">
                  <div v-if="post.metadata.settings.iso" class="setting">
                    <span class="label">ISO</span>
                    <span class="value">{{ post.metadata.settings.iso }}</span>
                  </div>
                  <div v-if="post.metadata.settings.aperture" class="setting">
                    <span class="label">f/</span>
                    <span class="value">{{ post.metadata.settings.aperture }}</span>
                  </div>
                  <div v-if="post.metadata.settings.shutterSpeed" class="setting">
                    <span class="label">{{ t("app.shutterSpeed") }}</span>
                    <span class="value">{{ post.metadata.settings.shutterSpeed }}</span>
                  </div>
                </div>
              </div>
            </div>

            <p class="location" v-if="post.location">
              <VaIcon name="place" />
              {{ post.location.name }}
              ({{ post.location.lat.toFixed(4) }}, {{ post.location.lng.toFixed(4) }})
            </p>
          </div>
        </div>

        <div class="map-section">
          <div class="map-header">
            <h3 class="map-title">{{ t("app.locationOnMap") }}</h3>
            <VaButton
              preset="plain"
              icon="fullscreen"
              @click="isMapFullscreen = !isMapFullscreen"
              class="fullscreen-button"
            />
          </div>
          <div :class="['map-container', { fullscreen: isMapFullscreen }]">
            <MapContainer :selected-post="post" :staticMode="true" />
          </div>
        </div>
      </section>

      <section v-else class="not-found">
        <div class="not-found-content">
          <VaIcon name="error" size="large" />
          <h2>{{ t("app.postNotFound") }}</h2>
          <p>{{ t("app.postNotFoundDesc") }}</p>
          <RouterLink to="/search" class="back-link">
            <VaButton>{{ t("app.backToSearch") }}</VaButton>
          </RouterLink>
        </div>
      </section>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { usePostStore } from "../stores/post";
import { useAuthStore } from "../stores/auth";
import { showToast } from "../utils/toast";
import PostCard from "../components/PostCard.vue";
import MapContainer from "../components/map/MapContainer.vue";
import { VaIcon, VaChip, VaButton, VaSkeleton } from "vuestic-ui";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const authStore = useAuthStore();

const isLoading = ref(true);
const error = ref<string | null>(null);
const isMapFullscreen = ref(false);
const isLikeAnimating = ref(false);

const postId = computed(() => route.params.id?.toString());
const post = computed(() => postStore.currentPost);
const isLiked = computed(() => {
  if (!authStore.user || !post.value) return false;
  return postStore.isLiked(post.value.id, authStore.user.id);
});

async function fetchPost() {
  if (!postId.value) {
    router.push("/search");
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    await postStore.fetchPostById(postId.value);
  } catch (err) {
    error.value = "app.errorLoadingPost";
    console.error("Error fetching post:", err);
  } finally {
    isLoading.value = false;
  }
}

async function handleLike() {
  if (!authStore.isAuthenticated) {
    showToast(t("app.loginRequired"), "info");
    return;
  }

  if (!post.value || !authStore.user || isLikeAnimating.value) return;

  isLikeAnimating.value = true;
  try {
    await postStore.toggleLike(post.value.id, authStore.user.id);
    showToast(
      postStore.isLiked(post.value.id, authStore.user.id)
        ? t("app.postLiked")
        : t("app.postUnliked"),
      "success"
    );
  } catch (err) {
    showToast(t("app.errorOccurred"), "error");
  } finally {
    isLikeAnimating.value = false;
  }
}

async function handleShare() {
  try {
    await navigator.share({
      title: post.value?.title,
      text: post.value?.description,
      url: window.location.href,
    });
    showToast(t("app.sharedSuccessfully"), "success");
  } catch (err) {
    await navigator.clipboard.writeText(window.location.href);
    showToast(t("app.linkCopied"), "success");
  }
}

// Перезагружаем пост при изменении ID в URL
watch(() => route.params.id, fetchPost, { immediate: true });

onMounted(fetchPost);
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.loading-state {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.error-state,
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;

  .error-content,
  .not-found-content {
    text-align: center;
    color: var(--primary-color);

    .va-icon {
      font-size: 64px;
      opacity: 0.5;
      margin-bottom: 16px;
    }

    h2 {
      font-size: 1.5rem;
      margin: 16px 0 8px;
    }

    p {
      color: var(--primary-color);
      opacity: 0.7;
      margin-bottom: 20px;
    }

    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
  }
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
  text-decoration: none;

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

      .action-button {
        opacity: 0.7;
        transition: all 0.2s;

        &:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        &.like-button {
          position: relative;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

          &:global(.liked) {
            transform: scale(1.1);
          }

          :global(.like-icon) {
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          &:hover :global(.like-icon) {
            transform: scale(1.2);
          }

          &:global(.liked) :global(.like-icon) {
            animation: likeAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
        }
      }
    }
  }

  .meta-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .stats {
    display: flex;
    gap: 24px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--primary-color);
    opacity: 0.8;
  }

  .meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}

.photo-info {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--va-border);

  h3 {
    font-size: 1.1rem;
    color: var(--primary-color);
    margin-bottom: 12px;
  }

  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary-color);
    opacity: 0.8;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
    margin-top: 8px;
  }

  .setting {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 0.85rem;
      color: var(--primary-color);
      opacity: 0.6;
    }

    .value {
      font-weight: 500;
      color: var(--primary-color);
    }
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

@keyframes likeAnimation {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
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
</style>
