import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export interface Comment {
  id: string;
  userId: string;
  user: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  user: string;
  title: string;
  imageUrl: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  likes: number;
  tags?: string[];
  comments: Comment[];
  createdAt: string;
}

export const usePostStore = defineStore("post", () => {
  const posts = ref<Post[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchPosts() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get("/data/posts.json");
      posts.value = response.data.posts;
    } catch (err) {
      error.value = "Ошибка при загрузке постов";
      console.error("Error fetching posts:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addPost(post: Omit<Post, "id" | "createdAt">) {
    const newPost: Post = {
      ...post,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      comments: [],
      likes: 0,
    };
    posts.value.unshift(newPost);
    // В реальном приложении здесь был бы API запрос
  }

  function addComment(postId: string, comment: Omit<Comment, "id" | "createdAt">) {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      const newComment: Comment = {
        ...comment,
        id: `c${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      post.comments.push(newComment);
      // В реальном приложении здесь был бы API запрос
    }
  }

  function toggleLike(postId: string, userId: string) {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      // В реальном приложении здесь была бы проверка лайка пользователя
      post.likes += 1;
    }
  }

  function getPostById(id: string) {
    return posts.value.find((p) => p.id === id);
  }

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    addPost,
    addComment,
    toggleLike,
    getPostById,
  };
});
