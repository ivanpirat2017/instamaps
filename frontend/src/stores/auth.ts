import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { showToast } from "../utils/toast";

export interface User {
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate?: string;
  followers?: number;
  following?: number;
}

// Фейковые пользователи
const mockUsers: User[] = [
  {
    username: "traveler",
    email: "traveler@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Путешественник и фотограф. Исследую мир через объектив камеры.",
    joinDate: "2024-01-15",
    followers: 1234,
    following: 567,
  },
  {
    username: "mountain_lover",
    email: "mountain@example.com",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Горный фотограф. Покоряю вершины и делюсь красотой гор.",
    joinDate: "2024-02-20",
    followers: 892,
    following: 345,
  },
  {
    username: "sea_lover",
    email: "sea@example.com",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Морской фотограф. Ловлю моменты на берегу океана.",
    joinDate: "2024-03-10",
    followers: 756,
    following: 234,
  },
];

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  async function login(email: string, password: string) {
    try {
      // Имитация API-запроса
      const mockUser = mockUsers.find((u) => u.email === email);
      if (mockUser) {
        user.value = mockUser;
        isAuthenticated.value = true;
        showToast("Успешный вход", "success");
        return true;
      }
      throw new Error("Пользователь не найден");
    } catch (error) {
      showToast("Ошибка входа", "error");
      return false;
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      // Имитация регистрации
      const newUser: User = {
        username,
        email,
        avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${username}`,
        bio: "Привет! Я новый пользователь PhotoStream.",
        joinDate: new Date().toISOString().split("T")[0],
        followers: 0,
        following: 0,
      };
      user.value = newUser;
      isAuthenticated.value = true;
      mockUsers.push(newUser);
      showToast("Регистрация успешна", "success");
      return true;
    } catch (error) {
      showToast("Ошибка регистрации", "error");
      return false;
    }
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
    showToast("Выход выполнен", "info");
  }

  function getUserByUsername(username: string): User | undefined {
    return mockUsers.find((u) => u.username === username);
  }

  return { user, isAuthenticated, login, register, logout, getUserByUsername, mockUsers };
});
