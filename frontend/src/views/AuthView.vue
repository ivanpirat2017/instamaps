<template>
  <main class="auth-body">
    <section class="auth-container">
      <AuthTabs v-model="activeTab" />
      <LoginForm
        v-if="activeTab === 'login'"
        @submit="handleLogin"
        @switch="activeTab = 'register'"
      />
      <RegisterForm
        v-if="activeTab === 'register'"
        @submit="handleRegister"
        @switch="activeTab = 'login'"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import AuthTabs from '../components/auth/AuthTabs.vue';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';

const activeTab = ref<'login' | 'register'>('login');
const authStore = useAuthStore();
const router = useRouter();

async function handleLogin({ email, password }: { email: string; password: string }) {
  try {
    if (await authStore.login(email, password)) {
      router.push('/');
    }
  } catch {
    // Error handled in LoginForm
  }
}

async function handleRegister({
  username,
  email,
  password,
  confirmPassword,
}: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    if (password !== confirmPassword) {
      return;
    }
    if (await authStore.register(username, email, password)) {
      router.push('/');
    }
  } catch {
    // Error handled in RegisterForm
  }
}
</script>