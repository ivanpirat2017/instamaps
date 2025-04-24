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
  likesCount: number;
  userLikes: { [key: string]: boolean }; // Объект для хранения лайков пользователей
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
      const response = await axios.get("/data/posts.json");
      const postsData = response.data.posts.items || [];

      const detailPromises = postsData.map(async (basicPost: any) => {
        try {
          const detailResponse = await axios.get(`/data/posts/${basicPost.id}.json`);
          return {
            ...basicPost,
            ...detailResponse.data,
            likesCount: detailResponse.data.likes || 0,
            userLikes: {}, // Инициализируем пустым объектом
            comments: detailResponse.data.comments || [],
            views: detailResponse.data.views || 0,
            image: basicPost.image,
          };
        } catch (err) {
          return {
            ...basicPost,
            likesCount: 0,
            userLikes: {},
            comments: [],
            views: 0,
          };
        }
      });

      posts.value = await Promise.all(detailPromises);
    } catch (err) {
      error.value = "Ошибка при загрузке постов";
      console.error("Error fetching posts:", err);
      posts.value = [];
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
        const response = await axios.get(`/data/posts/${id}.json`);
        currentPost.value = {
          ...response.data,
          likesCount: response.data.likes || 0,
          userLikes: {}, // Инициализируем пустым объектом
          comments: response.data.comments || [],
        };
      } catch {
        const post = posts.value.find((p) => p.id === id);
        if (!post) {
          error.value = "app.postNotFound";
          throw new Error("Post not found");
        }
        currentPost.value = post;
      }

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

    await simulateDelay();

    const currentLikeState = post.userLikes[userId] || false;

    if (currentLikeState) {
      // Убираем лайк
      post.likesCount = Math.max(0, post.likesCount - 1);
      post.userLikes[userId] = false;
    } else {
      // Добавляем лайк
      post.likesCount++;
      post.userLikes[userId] = true;
    }
  }

  function isLiked(postId: string, userId: string) {
    const post = getPostById(postId);
    return post ? post.userLikes[userId] || false : false;
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
