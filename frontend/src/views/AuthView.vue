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
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import AuthTabs from "../components/auth/AuthTabs.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

const activeTab = ref<"login" | "register">("login");
const authStore = useAuthStore();
const router = useRouter();

async function handleLogin({ email, password }: { email: string; password: string }) {
  try {
    if (await authStore.login(email, password)) {
      router.push("/");
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
      router.push("/");
    }
  } catch {
    // Error handled in RegisterForm
  }
}
</script>

<style scoped>
.auth-body {
  background: var(--background-gradient);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  min-height: calc(100vh - 136px);
}

.auth-container {
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
  max-width: 500px;
  width: 100%;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 16px;
  }
}
</style>
