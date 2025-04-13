import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  async function login(email: string, password: string) {
    try {
      const response = await axios.post('/api/login', { email, password })
      user.value = response.data.user
      isAuthenticated.value = true
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      const response = await axios.post('/api/register', { username, email, password })
      user.value = response.data.user
      isAuthenticated.value = true
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, register, logout }
})