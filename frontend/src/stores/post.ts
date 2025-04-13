import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

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
      title: "Закат на пляже",
      description: "Красивый вечер у моря, 12 апреля 2025",
      image: "https://via.placeholder.com/800x500",
      comments: [
        { id: 1, user: "user1", text: "Потрясающе!" },
        { id: 2, user: "user2", text: "Хочу туда!" },
      ],
      showComments: false,
      newComment: "",
      tags: ["закат", "пляж"],
      location: { lat: 12.34, lng: 56.78 },
      user: "traveler",
    },
    {
      id: 2,
      title: "Горы в тумане",
      description: "Утренний пейзаж, 10 апреля 2025",
      image: "https://via.placeholder.com/800x500",
      comments: [{ id: 1, user: "user3", text: "Какая атмосфера!" }],
      showComments: false,
      newComment: "",
      tags: ["природа", "горы"],
      user: "mountain_lover",
    },
    {
      id: 3,
      title: "Море и закат",
      description: "10 апреля 2025",
      image: "https://via.placeholder.com/300",
      comments: [],
      showComments: false,
      newComment: "",
      tags: ["закат", "море"],
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
      console.error("Failed to fetch posts:", error);
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
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  }

  return { posts, fetchPosts, toggleComments, addComment };
});