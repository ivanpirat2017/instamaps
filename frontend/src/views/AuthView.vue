<template>
  <main class="auth-body">
    <section class="auth-container">
      <div class="auth-tabs">
        <button class="tab" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">
          Вход
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
        >
          Регистрация
        </button>
      </div>
      <div class="auth-form" v-if="activeTab === 'login'">
        <h2>Вход</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="login-email">Эл. почта</label>
            <input
              v-model="loginForm.email"
              type="email"
              id="login-email"
              placeholder="example@domain.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="login-password">Пароль</label>
            <input
              v-model="loginForm.password"
              type="password"
              id="login-password"
              placeholder="Введите пароль"
              required
            />
          </div>
          <button type="submit" class="auth-button" :disabled="isLoading">Войти</button>
          <p class="form-switch">
            Нет аккаунта? <a href="#" @click.prevent="activeTab = 'register'">Зарегистрируйтесь</a>
          </p>
        </form>
      </div>
      <div class="auth-form" v-if="activeTab === 'register'">
        <h2>Регистрация</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="register-username">Имя пользователя</label>
            <input
              v-model="registerForm.username"
              type="text"
              id="register-username"
              placeholder="Ваш ник"
              required
            />
          </div>
          <div class="form-group">
            <label for="register-email">Эл. почта</label>
            <input
              v-model="registerForm.email"
              type="email"
              id="register-email"
              placeholder="example@domain.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="register-password">Пароль</label>
            <input
              v-model="registerForm.password"
              type="password"
              id="register-password"
              placeholder="Придумайте пароль"
              required
            />
          </div>
          <div class="form-group">
            <label for="register-confirm-password">Подтверждение пароля</label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              id="register-confirm-password"
              placeholder="Повторите пароль"
              required
            />
          </div>
          <button type="submit" class="auth-button" :disabled="isLoading">
            Зарегистрироваться
          </button>
          <p class="form-switch">
            Уже есть аккаунт? <a href="#" @click.prevent="activeTab = 'login'">Войдите</a>
          </p>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const activeTab = ref<"login" | "register">("login");
const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);

const loginForm = ref({
  email: "",
  password: "",
});

const registerForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function handleLogin() {
  isLoading.value = true;
  try {
    if (await authStore.login(loginForm.value.email, loginForm.value.password)) {
      router.push("/");
    } else {
      alert("Ошибка входа");
    }
  } finally {
    isLoading.value = false;
  }
}

async function handleRegister() {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert("Пароли не совпадают!");
    return;
  }
  isLoading.value = true;
  try {
    if (
      await authStore.register(
        registerForm.value.username,
        registerForm.value.email,
        registerForm.value.password
      )
    ) {
      router.push("/");
    } else {
      alert("Ошибка регистрации");
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
