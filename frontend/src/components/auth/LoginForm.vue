<template>
  <div class="auth-form">
    <h2>{{ $t("app.loginTitle") }}</h2>
    <form @submit.prevent="submit">
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
      <VaButton type="submit" block class="auth-button" :disabled="isSubmitting">
        {{ isSubmitting ? "..." : $t("app.submit") }}
      </VaButton>
      <p class="form-switch">
        {{ $t("app.noAccount") }}
        <a href="#" @click.prevent="$emit('switch', 'register')">{{ $t("app.register") }}</a>
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
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const isSubmitting = ref(false);

function validate(): boolean {
  errors.email = form.value.email ? "" : t("validation.emailRequired");
  errors.password = form.value.password ? "" : t("validation.passwordRequired");
  return !errors.email && !errors.password;
}

async function submit() {
  if (!validate()) return;

  isSubmitting.value = true;
  try {
    emit("submit", { ...form.value });
    showToast(t("app.loginSuccess"), "success");
  } catch {
    showToast(t("app.loginError"), "error");
  } finally {
    isSubmitting.value = false;
  }
}

const emit = defineEmits<{
  (e: "submit", value: { email: string; password: string }): void;
  (e: "switch", tab: "register"): void;
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