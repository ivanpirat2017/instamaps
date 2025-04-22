<template>
  <div class="auth-form">
    <h2>{{ $t("app.registerTitle") }}</h2>
    <form @submit.prevent="submit">
      <VaInput
        v-model="form.username"
        type="text"
        :label="$t('app.username')"
        :placeholder="$t('app.usernamePlaceholder')"
        :error="!!errors.username"
        :error-message="errors.username"
        required
        class="mb-4"
      />
      <VaInput
        v-model="form.email"
        type="email"
        :label="$t('app.email')"
        :placeholder="$t('app.emailPlaceholder')"
        :error="!!errors.email"
        :error-message="errors.email"
        required
        class="mb-4"
      />
      <VaInput
        v-model="form.password"
        type="password"
        :label="$t('app.password')"
        :placeholder="$t('app.passwordPlaceholder')"
        :error="!!errors.password"
        :error-message="errors.password"
        required
        class="mb-4"
      />
      <VaInput
        v-model="form.confirmPassword"
        type="password"
        :label="$t('app.confirmPassword')"
        :placeholder="$t('app.confirmPasswordPlaceholder')"
        :error="!!errors.confirmPassword"
        :error-message="errors.confirmPassword"
        required
        class="mb-4"
      />
      <VaButton type="submit" block class="auth-button" :disabled="isSubmitting">
        {{ isSubmitting ? "..." : $t("app.submit") }}
      </VaButton>
      <p class="form-switch">
        {{ $t("app.hasAccount") }}
        <a href="#" @click.prevent="$emit('switch', 'login')">{{ $t("app.login") }}</a>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { VaInput, VaButton } from "vuestic-ui";
import { showToast } from "../../utils/toast";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const isSubmitting = ref(false);

function validate(): boolean {
  errors.username = form.value.username ? "" : t("validation.usernameRequired");
  errors.email = form.value.email ? "" : t("validation.emailRequired");
  errors.password = form.value.password ? "" : t("validation.passwordRequired");
  errors.confirmPassword =
    form.value.confirmPassword && form.value.password === form.value.confirmPassword
      ? ""
      : t("validation.passwordMismatch");
  return !errors.username && !errors.email && !errors.password && !errors.confirmPassword;
}

async function submit() {
  if (!validate()) return;

  isSubmitting.value = true;
  try {
    emit("submit", { ...form.value });
    showToast(t("app.registerSuccess"), "success");
  } catch {
    showToast(t("app.registerError"), "error");
  } finally {
    isSubmitting.value = false;
  }
}

const emit = defineEmits<{
  (
    e: "submit",
    value: { username: string; email: string; password: string; confirmPassword: string }
  ): void;
  (e: "switch", tab: "login"): void;
}>();
</script>
<style lang="scss" scoped>
.form-switch {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  a {
    color: var(--accent-color);
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>