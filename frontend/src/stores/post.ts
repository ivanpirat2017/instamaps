import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export interface Post {
  id: string;
  userId: string;
  user: string;
  title: string;
  image: string;
  description?: string;
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  likes: number;
  tags?: string[];
  comments: Array<{
    id: string;
    userId: string;
    user: string;
    text: string;
    createdAt: string;
  }>;
  createdAt: string;
  views: number;
  metadata?: {
    camera?: string;
    lens?: string;
    settings?: {
      iso?: string;
      aperture?: string;
      shutterSpeed?: string;
    };
  };
}

export const usePostStore = defineStore("post", () => {
  const posts = ref<Post[]>([]);
  const currentPost = ref<Post | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  function simulateDelay() {
    return new Promise((resolve) => setTimeout(resolve, Math.random() * 500));
  }

  async function fetchPosts() {
    isLoading.value = true;
    error.value = null;

    try {
      await simulateDelay();

      // Загружаем список всех постов
      const response = await axios.get("/data/posts.json");
      const postsData = response.data.posts.items || [];

      // Создаем массив промисов для загрузки детальной информации
      const detailPromises = postsData.map(async (basicPost: any) => {
        try {
          const detailResponse = await axios.get(`/data/posts/${basicPost.id}.json`);
          return {
            ...basicPost,
            ...detailResponse.data,
            likes: 0,
            comments: [],
            views: 0,
            image: basicPost.image, // Используем image из базовых данных
          };
        } catch (err) {
          console.warn(
            `Детальная информация для поста ${basicPost.id} не найдена, используем базовые данные`
          );
          return {
            ...basicPost,
            likes: 0,
            comments: [],
            views: 0,
          };
        }
      });

      // Ждем загрузки всех деталей
      posts.value = await Promise.all(detailPromises);
    } catch (err) {
      error.value = "Ошибка при загрузке постов";
      console.error("Error fetching posts:", err);
      posts.value = []; // Инициализируем пустым массивом в случае ошибки
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchPostById(id: string) {
    isLoading.value = true;
    error.value = null;
    currentPost.value = null;

    try {
      await simulateDelay();

      try {
        // Сначала пытаемся загрузить детальный файл поста
        const response = await axios.get(`/data/posts/${id}.json`);
        currentPost.value = response.data;
      } catch {
        // Если детальный файл не найден, ищем в общем списке
        const post = posts.value.find((p) => p.id === id);
        if (!post) {
          error.value = "app.postNotFound";
          throw new Error("Post not found");
        }
        currentPost.value = post;
      }

      // Увеличиваем счетчик просмотров
      if (currentPost.value) {
        currentPost.value.views = (currentPost.value.views || 0) + 1;
      }

      return currentPost.value;
    } catch (err) {
      if (!error.value) {
        error.value = "app.errorLoadingPost";
      }
      console.error("Error fetching post:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function toggleLike(postId: string, userId: string) {
    const post = getPostById(postId);
    if (!post) return;

    // В реальном приложении здесь был бы запрос к API
    await simulateDelay();

    if (isLiked(postId, userId)) {
      post.likes--;
    } else {
      post.likes++;
    }
  }

  function isLiked(postId: string, userId: string) {
    const post = getPostById(postId);
    return post ? post.likes > 0 : false;
  }

  function getPostById(id: string) {
    return currentPost.value?.id === id ? currentPost.value : posts.value.find((p) => p.id === id);
  }

  return {
    posts,
    currentPost,
    isLoading,
    error,
    fetchPosts,
    fetchPostById,
    toggleLike,
    isLiked,
    getPostById,
  };
});
