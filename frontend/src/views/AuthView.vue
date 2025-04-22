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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  flex-direction: column;
}

.auth-container {
  border-radius: 12px;
  padding: 20px 12px 16px 12px;
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.1), 0 1.5px 8px rgba(0, 0, 0, 0.06);
  max-width: 360px;
  width: 100%;
  background: var(--white-transparent);
  backdrop-filter: blur(12px);
  border: 1.5px solid var(--border-color);
  transition: box-shadow 0.2s, border 0.2s;
}
.auth-container:hover {
  box-shadow: 0 8px 32px rgba(79, 70, 229, 0.16), 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1.5px solid var(--accent-color);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
  animation: fade-in 0.5s;
}
.auth-form h2 {
  font-size: 2rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 0.01em;
}
.auth-button {
  background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
  color: #fff;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.1);
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  margin-top: 8px;
}
.auth-button:active {
  transform: scale(0.98);
}
.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.form-switch {
  font-size: 0.98rem;
  color: #6b7280;
  text-align: center;
  margin-top: 8px;
}
.form-switch a {
  color: var(--accent-color);
  font-weight: 600;
  margin-left: 4px;
  transition: color 0.2s;
}
.form-switch a:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

.va-input {
  border-radius: 8px;
  background: #f3f4f6;
  box-shadow: 0 1px 4px rgba(79, 70, 229, 0.04);
  transition: box-shadow 0.2s, border 0.2s;
}
.va-input:focus-within {
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.1);
  border-color: var(--accent-color);
}

@media (max-width: 600px) {
  .auth-container {
    padding: 10px 2px;
    border-radius: 8px;
  }
  .auth-form h2 {
    font-size: 1.3rem;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
