App.vue
<template>
    <div class="flex flex-col min-h-screen">
      <AppHeader />
      <router-view />
      <AppFooter />
    </div>
  </template>
  
  <script setup lang="ts">
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';
  </script>

assets\styles.scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'vuestic-ui/styles/essential.css';
@import 'vuestic-ui/styles/typography.css';

$primary-color: #1f2937;
$accent-color: #4f46e5;
$accent-hover: #7c3aed;
$background-gradient: linear-gradient(135deg, #e0e7ff, #c3dafe);
$white-transparent: rgba(255, 255, 255, 0.9);
$shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
$border-color: rgba(0, 0, 0, 0.1);

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    background: $background-gradient;
    color: $primary-color;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
  }

  .header {
    background: $white-transparent;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid $border-color;
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 12px 0;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: $primary-color;
    transition: color 0.3s;

    &:hover {
      color: $accent-color;
    }
  }

  .nav {
    display: flex;
    align-items: center;
  }

  .footer {
    background: $white-transparent;
    backdrop-filter: blur(10px);
    border-top: 1px solid $border-color;
    padding: 16px 0;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
  }

  main {
    flex-grow: 1;
    overflow-y: auto;
    padding: 16px 0;
  }

  .post {
    background: white;
    border-radius: 12px;
    padding: 12px;
    box-shadow: $shadow;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-4px);
    }

    img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 10px;
      object-fit: cover;
    }

    .post-content {
      h3 {
        font-size: 1.2rem;
        color: $primary-color;
        margin-bottom: 4px;
      }

      p {
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 8px;
      }
    }

    .comments {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid $border-color;

      p {
        font-size: 0.85rem;
        color: #6b7280;
        margin-bottom: 6px;
      }
    }
  }

  .profile-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: $shadow;
    text-align: center;
    margin-bottom: 16px;

    h2 {
      font-size: 1.5rem;
      color: $primary-color;
      margin-bottom: 6px;
    }

    p {
      font-size: 0.95rem;
      color: #6b7280;
      margin-bottom: 12px;
    }
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;

    img {
      width: 100%;
      border-radius: 10px;
      object-fit: cover;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

  .map-container {
    background: white;
    border-radius: 12px;
    padding: 12px;
    box-shadow: $shadow;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;

    #map {
      flex-grow: 1;
      border-radius: 10px;
      min-height: 300px;
      width: 100%;
    }

    .map-overlay {
      position: absolute;
      top: 16px;
      left: 16px;
      max-width: 280px;
    }
  }

  .auth-body {
    background: $background-gradient;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    min-height: calc(100vh - 136px);
  }

  .auth-container {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: $shadow;
    max-width: 500px;
    width: 100%;
  }

  .search-container {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: $shadow;

    .search-bar {
      display: flex;
      align-items: center;
      max-width: 400px;
      flex-grow: 1;
      margin-bottom: 15px;
    }

    .search-results {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;

      .result-item {
        background: white;
        border-radius: 10px;
        padding: 12px;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-4px);
        }

        img {
          width: 100%;
          border-radius: 8px;
          margin-bottom: 8px;
          object-fit: cover;
        }

        .result-info {
          h3 {
            font-size: 1.1rem;
            color: $primary-color;
            margin-bottom: 4px;
          }

          p {
            font-size: 0.85rem;
            color: #6b7280;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}

@layer utilities {
  @media (max-width: 1024px) {
    .header .container {
      flex-wrap: wrap;
      gap: 12px;
    }

    .search-bar {
      margin: 0;
      width: 100%;
      max-width: none;
    }
  }

  @media (max-width: 768px) {
    .photo-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .search-results {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .auth-container {
      padding: 16px;
    }

    .map-container {
      padding: 8px;

      .map-overlay {
        width: calc(100% - 32px);
        left: 16px;
      }

      #map {
        min-height: 200px;
      }
    }
  }
}

components\AppFooter.vue
<template>
    <footer class="footer">
      <div class="container">
        <Copyright />
        <SocialLinks />
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  import Copyright from './footer/Copyright.vue';
  import SocialLinks from './footer/SocialLinks.vue';
  </script>

components\AppHeader.vue
<template>
    <header class="header">
      <div class="container">
        <Logo />
        <nav class="nav">
          <BurgerMenu v-if="isMobile" :is-open="isMenuOpen" @toggle="toggleMenu" />
          <NavMenu :is-open="isMenuOpen" @close="closeMenu" :is-mobile="isMobile" />
        </nav>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import Logo from './header/Logo.vue';
  import NavMenu from './header/NavMenu.vue';
  import BurgerMenu from './header/BurgerMenu.vue';
  
  const isMenuOpen = ref(false);
  const isMobile = computed(() => window.innerWidth <= 768);
  
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }
  
  function closeMenu() {
    isMenuOpen.value = false;
  }
  </script>

components\auth\AuthTabs.vue
<template>
  <VaTabs v-model="value" grow>
    <VaTab value="login">Вход</VaTab>
    <VaTab value="register">Регистрация</VaTab>
  </VaTabs>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { VaTabs, VaTab } from "vuestic-ui";

const props = defineProps<{
  value: "login" | "register";
}>();

const value = toRef(props.value);

defineEmits(["update:value"]);
</script>


components\auth\LoginForm.vue
<template>
  <div class="auth-form">
    <h2>Вход</h2>
    <form @submit.prevent="submit">
      <VaInput
        v-model="form.email"
        type="email"
        label="Эл. почта"
        placeholder="example@domain.com"
        required
        class="mb-4"
      />
      <VaInput
        v-model="form.password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        required
        class="mb-4"
      />
      <VaButton type="submit" block class="auth-button">Войти</VaButton>
      <p class="form-switch">
        Нет аккаунта? <a href="#" @click.prevent="$emit('switch', 'register')">Зарегистрируйтесь</a>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VaInput, VaButton } from "vuestic-ui";

const form = ref({
  email: "",
  password: "",
});

function submit() {
  emit("submit", { ...form.value });
}

defineEmits<{
  (e: "submit", value: { email: string; password: string }): void;
  (e: "switch", tab: "register"): void;
}>();
</script>


components\auth\RegisterForm.vue
<template>
    <div class="auth-form">
      <h2>Регистрация</h2>
      <form @submit.prevent="submit">
        <VaInput
          v-model="form.username"
          type="text"
          label="Имя пользователя"
          placeholder="Ваш ник"
          required
          class="mb-4"
        />
        <VaInput
          v-model="form.email"
          type="email"
          label="Эл. почта"
          placeholder="example@domain.com"
          required
          class="mb-4"
        />
        <VaInput
          v-model="form.password"
          type="password"
          label="Пароль"
          placeholder="Придумайте пароль"
          required
          class="mb-4"
        />
        <VaInput
          v-model="form.confirmPassword"
          type="password"
          label="Подтверждение пароля"
          placeholder="Повторите пароль"
          required
          class="mb-4"
        />
        <VaButton type="submit" block class="auth-button">Зарегистрироваться</VaButton>
        <p class="form-switch">
          Уже есть аккаунт? <a href="#" @click.prevent="$emit('switch', 'login')">Войдите</a>
        </p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { VaInput, VaButton } from 'vuestic-ui';
  
  const form = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  function submit() {
    emit('submit', { ...form.value });
  }
  
  defineEmits<{
    (e: 'submit', value: { username: string; email: string; password: string; confirmPassword: string }): void;
    (e: 'switch', tab: 'login'): void;
  }>();
  </script>

components\footer\Copyright.vue
<template>
    <p>© 2025 PhotoStream. Все права защищены.</p>
  </template>
  
  <script setup lang="ts"></script>

components\footer\SocialLinks.vue
<template>
    <div class="social-links">
      <VaButton
        v-for="link in socialLinks"
        :key="link.label"
        :href="link.href"
        preset="plain"
        color="primary"
        class="social-link"
      >
        {{ link.label }}
      </VaButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { VaButton } from 'vuestic-ui';
  
  const socialLinks = [
    { label: 'X', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Контакты', href: '#' },
  ];
  </script>
  
  <style scoped>
  .social-link {
    margin-left: 12px;
  }
  </style>

components\header\BurgerMenu.vue
<template>
    <VaButton
      preset="plain"
      icon="menu"
      class="burger"
      :class="{ active: isOpen }"
      @click="$emit('toggle')"
    />
  </template>
  
  <script setup lang="ts">
  import { VaButton } from 'vuestic-ui';
  defineProps<{
    isOpen: boolean;
  }>();
  defineEmits(['toggle']);
  </script>
  
  <style scoped>
  .burger {
    display: flex;
  }
  </style>

components\header\Logo.vue
<template>
  <router-link to="/" class="logo">PhotoStream</router-link>
</template>
 


components\header\NavMenu.vue
<template>
  <VaDropdown v-model="isOpen" :close-on-click-outside="true" v-if="isMobile">
    <template #anchor>
      <span></span>
    </template>
    <VaDropdownContent class="nav-menu">
      <ul>
        <li v-for="item in navItems" :key="item.path">
          <router-link :to="item.path" class="nav-link" @click="$emit('close')">
            <VaIcon :name="item.icon" />
            {{ item.label }}
          </router-link>
        </li>
        <li v-if="!authStore.isAuthenticated">
          <router-link to="/auth" class="nav-link" @click="$emit('close')">
            <VaIcon name="login" />
            Вход
          </router-link>
        </li>
        <li v-else>
          <VaButton preset="plain" color="danger" class="nav-link" @click.prevent="logout">
            <VaIcon name="logout" />
            Выход
          </VaButton>
        </li>
      </ul>
    </VaDropdownContent>
  </VaDropdown>
  <ul class="nav-menu" v-else>
    <li v-for="item in navItems" :key="item.path">
      <router-link :to="item.path" class="nav-link" active-class="active">
        <VaIcon :name="item.icon" />
        {{ item.label }}
      </router-link>
    </li>
    <li v-if="!authStore.isAuthenticated">
      <router-link to="/auth" class="nav-link">
        <VaIcon name="login" />
        Вход
      </router-link>
    </li>
    <li v-else>
      <VaButton preset="plain" color="danger" class="nav-link" @click.prevent="logout">
        <VaIcon name="logout" />
        Выход
      </VaButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { VaDropdown, VaDropdownContent, VaButton, VaIcon } from "vuestic-ui";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import { defineProps, toRef } from "vue";

const props = defineProps<{
  isOpen: boolean;
  isMobile: boolean;
}>();

const isOpen = toRef(props.isOpen)
 

const emit = defineEmits(["close"]);

const authStore = useAuthStore();
const router = useRouter();

const navItems = [
  { path: "/", label: "Лента", icon: "home" },
  { path: "/search", label: "Поиск", icon: "search" },
  { path: "/map", label: "Карта", icon: "map" },
  { path: "/profile", label: "Профиль", icon: "person" },
];

function logout() {
  authStore.logout();
  router.push("/auth");
  emit("close");
}
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-menu {
  display: flex;
  gap: 16px;
  list-style: none;
}

@media (max-width: 768px) {
  .nav-menu {
    flex-direction: column;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>


components\map\MapContainer.vue
<template>
  <section class="map-container">
    <div id="map" ref="mapContainer"></div>
    <MapOverlay :post="selectedPost" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import MapOverlay from "./MapOverlay.vue";
import type { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { usePostStore } from "../../stores/post";
import { type Post } from "../../stores/post";

const postStore = usePostStore();
const mapContainer = ref<HTMLElement | null>(null);
let map: Map | null = null;

defineProps<{
  selectedPost: Post | null;
}>();
const emit = defineEmits<{
  (e: "update-selected", post: Post): void;
}>();

onMounted(() => {
  if (!mapContainer.value) return;

  import("maplibre-gl").then((maplibregl) => {
    map = new maplibregl.Map({
      container: mapContainer.value!,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 0],
      zoom: 2,
    });

    map.addControl(new maplibregl.NavigationControl());

    map.on("load", () => {
      postStore.posts.forEach((post) => {
        if (post.location) {
          new maplibregl.Marker()
            .setLngLat([post.location.lng, post.location.lat])
            .setPopup(
              new maplibregl.Popup().setHTML(`<h3>${post.title}</h3><p>${post.description}</p>`)
            )
            .addTo(map!)
            .getElement()
            .addEventListener("click", () => {
              emit("update-selected", post);
            });
        }
      });
    });

    window.addEventListener("resize", () => map?.resize());
  });
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
  window.removeEventListener("resize", () => map?.resize());
});
</script>


components\map\MapOverlay.vue
<template>
  <VaCard class="map-overlay" v-if="post">
    <VaCardTitle>{{ post.title }}</VaCardTitle>
    <VaCardContent>
      <p>Местоположение: {{ post.location?.lat }}, {{ post.location?.lng }}</p>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard, VaCardTitle, VaCardContent } from "vuestic-ui";
import { type Post } from "../../stores/post";

defineProps<{
  post: Post | null;
}>();
</script>


components\post\AddComment.vue
<template>
    <div class="add-comment">
      <VaInput
        v-model="post.newComment"
        placeholder="Ваш комментарий..."
        class="flex-grow"
      />
      <VaButton @click="postStore.addComment(post.id, authStore.user?.username || 'user')">
        Отправить
      </VaButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { VaInput, VaButton } from 'vuestic-ui';
  import { usePostStore } from '../../stores/post';
  import { useAuthStore } from '../../stores/auth';
  import { Post } from '../../stores/post';
  
  defineProps<{
    post: Post;
  }>();
  
  const postStore = usePostStore();
  const authStore = useAuthStore();
  </script>
  
  <style scoped>
  .add-comment {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  </style>

components\post\CommentsSection.vue
<template>
    <div class="comments" v-if="post.showComments">
      <p v-for="comment in post.comments" :key="comment.id">
        <strong>{{ comment.user }}:</strong> {{ comment.text }}
      </p>
      <AddComment :post="post" v-if="authStore.isAuthenticated" />
      <p v-else class="text-gray-500 text-sm">Войдите, чтобы оставить комментарий</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '../../stores/auth';
  import AddComment from './AddComment.vue';
  import { Post } from '../../stores/post';
  
  defineProps<{
    post: Post;
  }>();
  
  const authStore = useAuthStore();
  </script>

components\post\PostContent.vue
<template>
    <div class="post-content">
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}</p>
      <VaButton
        preset="plain"
        color="primary"
        class="toggle-comments"
        @click="postStore.toggleComments(post.id)"
      >
        {{ post.showComments ? 'Скрыть комментарии' : `Комментарии (${post.comments.length})` }}
      </VaButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { VaButton } from 'vuestic-ui';
  import { usePostStore } from '../../stores/post';
  import { Post } from '../../stores/post';
  
  defineProps<{
    post: Post;
  }>();
  
  const postStore = usePostStore();
  </script>

components\post\PostImage.vue
<template>
    <img :src="src" :alt="alt" />
  </template>
  
  <script setup lang="ts">
  defineProps<{
    src: string;
    alt: string;
  }>();
  </script>

components\PostCard.vue
<template>
    <div class="post">
      <PostImage :src="post.image" :alt="post.title" />
      <PostContent :post="post" />
      <CommentsSection :post="post" />
    </div>
  </template>
  
  <script setup lang="ts">
  import PostImage from './post/PostImage.vue';
  import PostContent from './post/PostContent.vue';
  import CommentsSection from './post/CommentsSection.vue';
  import { Post } from '../stores/post';
  
  defineProps<{
    post: Post;
  }>();
  </script>

components\profile\PhotoGrid.vue
<template>
  <section class="photo-grid">
    <img v-for="post in posts" :key="post.id" :src="post.image" :alt="post.title" />
  </section>
</template>

<script setup lang="ts">
import { Post } from "../../stores/post";

defineProps<{
  posts: Post[];
}>();
</script>


components\profile\ProfileCard.vue
<template>
    <section class="profile-card">
      <VaAvatar src="https://via.placeholder.com/120" size="large" />
      <h2>@{{ user?.username || 'traveler' }}</h2>
      <p>Люблю природу и фотографию. Исследую мир!</p>
      <div class="tags">
        <VaChip v-for="tag in profileTags" :key="tag" color="primary">
          #{{ tag }}
        </VaChip>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { VaAvatar, VaChip } from 'vuestic-ui';
  
  defineProps<{
    user: { username: string } | null;
  }>();
  
  const profileTags = ['природа', 'путешествия', 'фото'];
  </script>

components\search\FilterTags.vue
<template>
  <div class="filter-tags">
    <VaChip
      v-for="tag in tags"
      :key="tag"
      :color="value === tag ? 'primary' : 'background'"
      :outline="value !== tag"
      @click="$emit('filter', tag)"
    >
      {{ tag }}
    </VaChip>
  </div>
</template>

<script setup lang="ts">
import { VaChip } from "vuestic-ui";

defineProps<{
  tags: string[];
  value: string | null;
}>();
defineEmits(["filter"]);
</script>

<style scoped>
.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
</style>


components\search\ResultItem.vue
<template>
  <div class="result-item">
    <img :src="post.image" :alt="post.title" />
    <div class="result-info">
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}, @{{ post.user }}</p>
      <div class="result-tags">
        <VaChip v-for="tag in post.tags" :key="tag" size="small" color="primary">
          #{{ tag }}
        </VaChip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VaChip } from "vuestic-ui";
import { Post } from "../../stores/post";

defineProps<{
  post: Post;
}>();
</script>


components\search\SearchBar.vue
<template>
  <div class="search-bar">
    <VaInput v-model="value" placeholder="Поиск: закат на пляже..." class="flex-grow" />
    <VaButton @click="$emit('search')">Найти</VaButton>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { VaInput, VaButton } from "vuestic-ui";

const props = defineProps<{
  value: string;
}>();
const value = toRef(props.value);

defineEmits(["update:value", "search"]);
</script>


components\search\SearchResults.vue
<template>
  <div class="search-results">
    <ResultItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import ResultItem from "./ResultItem.vue";
import { Post } from "../../stores/post";

defineProps<{
  posts: Post[];
}>();
</script>


main.ts
import { createVuestic } from 'vuestic-ui';
import 'vuestic-ui/styles/essential.css';
import 'vuestic-ui/styles/typography.css';
import './assets/styles.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createVuestic());
app.mount('#app');

router\index.ts
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: () => import('../views/FeedView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
  ],
});

export default router;

stores\auth.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  async function login(email: string, password: string) {
    try {
      const response = await axios.post('/api/login', { email, password });
      user.value = response.data.user;
      isAuthenticated.value = true;
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      const response = await axios.post('/api/register', { username, email, password });
      user.value = response.data.user;
      isAuthenticated.value = true;
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return { user, isAuthenticated, login, register, logout };
});

stores\post.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export interface Comment {
  id: number;
  user: string;
  text: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  comments: Comment[];
  showComments: boolean;
  newComment: string;
  tags?: string[];
  location?: { lat: number; lng: number };
  user?: string;
}

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([
    {
      id: 1,
      title: 'Закат на пляже',
      description: 'Красивый вечер у моря, 12 апреля 2025',
      image: 'https://via.placeholder.com/800x500',
      comments: [
        { id: 1, user: 'user1', text: 'Потрясающе!' },
        { id: 2, user: 'user2', text: 'Хочу туда!' },
      ],
      showComments: false,
      newComment: '',
      tags: ['закат', 'пляж'],
      location: { lat: 12.34, lng: 56.78 },
      user: 'traveler',
    },
    {
      id: 2,
      title: 'Горы в тумане',
      description: 'Утренний пейзаж, 10 апреля 2025',
      image: 'https://via.placeholder.com/800x500',
      comments: [{ id: 1, user: 'user3', text: 'Какая атмосфера!' }],
      showComments: false,
      newComment: '',
      tags: ['природа', 'горы'],
      user: 'mountain_lover',
    },
    {
      id: 3,
      title: 'Море и закат',
      description: '10 апреля 2025',
      image: 'https://via.placeholder.com/300',
      comments: [],
      showComments: false,
      newComment: '',
      tags: ['закат', 'море'],
      user: 'sea_lover',
    },
  ]);

  async function fetchPosts() {
    try {
      const response = await axios.get('/api/posts');
      posts.value = response.data.map((post: Post) => ({
        ...post,
        showComments: false,
        newComment: '',
      }));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }

  function toggleComments(postId: number) {
    const post = posts.value.find((p) => p.id === postId);
    if (post) post.showComments = !post.showComments;
  }

  async function addComment(postId: number, user: string) {
    const post = posts.value.find((p) => p.id === postId);
    if (post && post.newComment.trim()) {
      const newComment = {
        id: post.comments.length + 1,
        user,
        text: post.newComment,
      };
      try {
        await axios.post(`/api/posts/${postId}/comments`, newComment);
        post.comments.push(newComment);
        post.newComment = '';
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  }

  return { posts, fetchPosts, toggleComments, addComment };
});

views\AuthView.vue
<template>
    <main class="auth-body">
      <section class="auth-container">
        <AuthTabs v-model="activeTab" />
        <LoginForm v-if="activeTab === 'login'" @submit="handleLogin" />
        <RegisterForm v-if="activeTab === 'register'" @submit="handleRegister" />
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  import AuthTabs from '../components/auth/AuthTabs.vue';
  import LoginForm from '../components/auth/LoginForm.vue';
  import RegisterForm from '../components/auth/RegisterForm.vue';
  
  const activeTab = ref<'login' | 'register'>('login');
  const authStore = useAuthStore();
  const router = useRouter();
  
  async function handleLogin({ email, password }: { email: string; password: string }) {
    try {
      if (await authStore.login(email, password)) {
        router.push('/');
      } else {
        alert('Ошибка входа');
      }
    } catch {
      alert('Ошибка входа');
    }
  }
  
  async function handleRegister({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    try {
      if (await authStore.register(username, email, password)) {
        router.push('/');
      } else {
        alert('Ошибка регистрации');
      }
    } catch {
      alert('Ошибка регистрации');
    }
  }
  </script>

views\FeedView.vue
<template>
    <main class="container">
      <section class="feed">
        <PostCard v-for="post in postStore.posts" :key="post.id" :post="post" />
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { usePostStore } from '../stores/post';
  import { onMounted } from 'vue';
  import PostCard from '../components/PostCard.vue';
  
  const postStore = usePostStore();
  
  onMounted(() => {
    postStore.fetchPosts();
  });
  </script>

views\MapView.vue
<template>
    <main class="container">
      <MapContainer :selected-post="selectedPost" @update-selected="selectedPost = $event" />
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { usePostStore } from '../stores/post';
  import MapContainer from '../components/map/MapContainer.vue';
  import { Post } from '../stores/post';
  
  const postStore = usePostStore();
  const selectedPost = ref<Post | null>(postStore.posts[0]);
  </script>

views\ProfileView.vue
<template>
    <main class="container">
      <ProfileCard :user="user" />
      <PhotoGrid :posts="userPosts" />
    </main>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { usePostStore } from '../stores/post';
  import ProfileCard from '../components/profile/ProfileCard.vue';
  import PhotoGrid from '../components/profile/PhotoGrid.vue';
  
  const authStore = useAuthStore();
  const postStore = usePostStore();
  
  const user = computed(() => authStore.user);
  const userPosts = computed(() =>
    postStore.posts.filter((post) => post.user === user.value?.username)
  );
  </script>

views\SearchView.vue
<template>
    <main class="container">
      <section class="search-container mb-4">
        <h2>Поиск фотографий</h2>
        <SearchBar v-model="searchQuery" @search="search" />
      </section>
      <section class="search-container">
        <FilterTags v-model="activeTag" :tags="tags" @filter="filterByTag" />
        <SearchResults :posts="filteredPosts" />
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { usePostStore } from '../stores/post';
  import SearchBar from '../components/search/SearchBar.vue';
  import FilterTags from '../components/search/FilterTags.vue';
  import SearchResults from '../components/search/SearchResults.vue';
  
  const postStore = usePostStore();
  const searchQuery = ref('');
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
    searchQuery.value = '';
  }
  </script>
