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
  const userLikes = ref<Set<string>>(new Set());

  // Имитация случайных задержек как в реальном API
  function simulateDelay() {
    const delay = Math.random() * 1000 + 500; // 500-1500ms
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Имитация случайных ошибок
  function simulateError() {
    return Math.random() < 0.1; // 10% шанс ошибки
  }

  async function fetchPosts() {
    isLoading.value = true;
    error.value = null;

    try {
      await simulateDelay();

      if (simulateError()) {
        throw new Error("Network error");
      }

      const response = await axios.get("/data/posts.json");
      posts.value = response.data.posts;
    } catch (err) {
      error.value = "Ошибка при загрузке постов";
      console.error("Error fetching posts:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function addPost(post: Omit<Post, "id" | "createdAt" | "comments" | "likes">) {
    try {
      await simulateDelay();

      if (simulateError()) {
        throw new Error("Network error");
      }

      const newPost: Post = {
        ...post,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        comments: [],
        likes: 0,
      };

      posts.value.unshift(newPost);
      return newPost;
    } catch (err) {
      console.error("Error adding post:", err);
      throw err;
    }
  }

  async function addComment(postId: string, comment: Omit<Comment, "id" | "createdAt">) {
    try {
      await simulateDelay();

      if (simulateError()) {
        throw new Error("Network error");
      }

      const post = posts.value.find((p) => p.id === postId);
      if (post) {
        const newComment: Comment = {
          ...comment,
          id: `c${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        post.comments.push(newComment);
        return newComment;
      }
      throw new Error("Post not found");
    } catch (err) {
      console.error("Error adding comment:", err);
      throw err;
    }
  }

  async function toggleLike(postId: string, userId: string) {
    try {
      await simulateDelay();

      if (simulateError()) {
        throw new Error("Network error");
      }

      const post = posts.value.find((p) => p.id === postId);
      if (post) {
        const likeId = `${postId}-${userId}`;
        if (userLikes.value.has(likeId)) {
          userLikes.value.delete(likeId);
          post.likes -= 1;
        } else {
          userLikes.value.add(likeId);
          post.likes += 1;
        }
        return post.likes;
      }
      throw new Error("Post not found");
    } catch (err) {
      console.error("Error toggling like:", err);
      throw err;
    }
  }

  function isLiked(postId: string, userId: string) {
    return userLikes.value.has(`${postId}-${userId}`);
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
    isLiked,
    getPostById,
  };
});
