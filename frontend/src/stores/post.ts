import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { showToast } from "../utils/toast";

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

export const usePostStore = defineStore("post", () => {
  const posts = ref<Post[]>([
    {
      id: 1,
      title: "Beach Sunset",
      description: "A beautiful evening by the sea, April 12, 2025",
      image: "https://img3.wallspic.com/attachments/originals/8/0/5/5/45508-sciences-ciel-le_lac_peyto-ecosysteme-les_reliefs_montagneux-4096x2725.jpg",
      comments: [
        { id: 1, user: "user1", text: "Stunning!" },
        { id: 2, user: "user2", text: "I want to go there!" },
      ],
      showComments: false,
      newComment: "",
      tags: ["sunset", "beach"],
      location: { lat: 12.34, lng: 56.78 },
      user: "traveler",
    },
    {
      id: 2,
      title: "Misty Mountains",
      description: "Morning landscape, April 10, 2025",
      image: "https://i.pinimg.com/originals/e2/ec/31/e2ec318333608d137b47ce8f2a83eed0.jpg",
      comments: [{ id: 1, user: "user3", text: "What an atmosphere!" }],
      showComments: false,
      newComment: "",
      tags: ["nature", "mountains"],
      user: "mountain_lover",
    },
    {
      id: 3,
      title: "Sea and Sunset",
      description: "April 10, 2025",
      image: "https://crosti.ru/patterns/00/28/19/27_picture_fa89e46d.jpg",
      comments: [],
      showComments: false,
      newComment: "",
      tags: ["sunset", "sea"],
      user: "sea_lover",
    },
  ]);

  async function fetchPosts() {
    try {
      const response = await axios.get("/api/posts");
      posts.value = response.data.map((post: Post) => ({
        ...post,
        showComments: false,
        newComment: "",
      }));
    } catch (error) {
      throw new Error("Failed to fetch posts");
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
        post.newComment = "";
        showToast("Comment added", "success");
      } catch (error) {
        showToast("Failed to add comment", "error");
      }
    }
  }

  return { posts, fetchPosts, toggleComments, addComment };
});
