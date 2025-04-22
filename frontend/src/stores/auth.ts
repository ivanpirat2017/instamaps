import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { showToast } from "../utils/toast";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate?: string;
  followers?: number;
  following?: number;
  location?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const users = ref<User[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchUsers() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get("/data/users.json");
      users.value = response.data.users;
    } catch (err) {
      error.value = "Ошибка при загрузке пользователей";
      console.error("Error fetching users:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function login(email: string, password: string) {
    try {
      if (users.value.length === 0) {
        await fetchUsers();
      }
      const mockUser = users.value.find((u) => u.email === email);
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
      // Проверяем уникальность email и username
      if (users.value.some((u) => u.email === email || u.username === username)) {
        throw new Error("Пользователь с таким email или именем уже существует");
      }

      const newUser: User = {
        id: String(users.value.length + 1),
        username,
        email,
        avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${username}`,
        bio: "Привет! Я новый пользователь PhotoStream.",
        joinDate: new Date().toISOString().split("T")[0],
        followers: 0,
        following: 0,
      };

      users.value.push(newUser);
      user.value = newUser;
      isAuthenticated.value = true;
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
    if (users.value.length === 0) {
      fetchUsers();
    }
    return users.value.find((u) => u.username === username);
  }

  return {
    user,
    users,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    getUserByUsername,
    fetchUsers,
  };
});
