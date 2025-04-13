import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { showToast } from "../utils/toast";

export interface User {
  username: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  async function login(email: string, password: string) {
    try {
      const response = await axios.post("/api/login", { email, password });
      user.value = response.data.user;
      isAuthenticated.value = true;
      showToast("Login successful", "success");
      return true;
    } catch (error) {
      showToast("Login failed", "error");
      return false;
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      const response = await axios.post("/api/register", { username, email, password });
      user.value = response.data.user;
      isAuthenticated.value = true;
      showToast("Registration successful", "success");
      return true;
    } catch (error) {
      showToast("Registration failed", "error");
      return false;
    }
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
    showToast("Logged out", "info");
  }

  return { user, isAuthenticated, login, register, logout };
});
