import { defineStore } from "pinia";
import { ref } from "vue";

export interface Comment {
  id: string;
  user: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  user: string;
  imageUrl: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  likes: number;
  comments: Comment[];
  createdAt: string;
}

// Фейковые посты
const mockPosts: Post[] = [
  {
    id: "1",
    user: "traveler",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Удивительный закат в горах 🌄",
    location: {
      lat: 46.8182,
      lng: 8.2275,
      name: "Швейцарские Альпы",
    },
    likes: 234,
    comments: [
      {
        id: "c1",
        user: "mountain_lover",
        text: "Потрясающий вид! Где именно это место?",
        createdAt: "2024-04-21T15:30:00Z",
      },
    ],
    createdAt: "2024-04-21T14:20:00Z",
  },
  {
    id: "2",
    user: "mountain_lover",
    imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
    description: "Туманное утро в горах ⛰️",
    location: {
      lat: 45.932,
      lng: 7.628,
      name: "Маттерхорн",
    },
    likes: 567,
    comments: [],
    createdAt: "2024-04-20T08:15:00Z",
  },
  {
    id: "3",
    user: "sea_lover",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0",
    description: "Морской бриз и спокойствие 🌊",
    location: {
      lat: 43.2677,
      lng: 6.6407,
      name: "Французская Ривьера",
    },
    likes: 432,
    comments: [
      {
        id: "c2",
        user: "traveler",
        text: "Выглядит очень умиротворяюще!",
        createdAt: "2024-04-19T16:45:00Z",
      },
    ],
    createdAt: "2024-04-19T12:30:00Z",
  },
  {
    id: "4",
    user: "traveler",
    imageUrl: "https://images.unsplash.com/photo-1682687220247-9f786e34d472",
    description: "Городские огни ночью 🌃",
    location: {
      lat: 48.8566,
      lng: 2.3522,
      name: "Париж",
    },
    likes: 789,
    comments: [],
    createdAt: "2024-04-18T22:10:00Z",
  },
];

export const usePostStore = defineStore("post", () => {
  const posts = ref<Post[]>(mockPosts);

  function addPost(post: Post) {
    posts.value.unshift(post);
  }

  function addComment(postId: string, comment: Comment) {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      if (!post.comments) {
        post.comments = [];
      }
      post.comments.push(comment);
    }
  }

  function toggleLike(postId: string) {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      post.likes += 1; // В реальном приложении здесь будет проверка, лайкнул ли уже пользователь пост
    }
  }

  function getPostById(id: string) {
    return posts.value.find((p) => p.id === id);
  }

  return {
    posts,
    addPost,
    addComment,
    toggleLike,
    getPostById,
  };
});
