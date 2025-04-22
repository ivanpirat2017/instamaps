<template>
  <div class="auth-body">
    <div class="auth-container">
      <VaTabs grow>
        <VaTab @click="updateValue('login')">{{ $t("app.login") }}</VaTab>
        <VaTab @click="updateValue('register')">{{ $t("app.register") }}</VaTab>
      </VaTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VaTabs, VaTab } from "vuestic-ui";

const props = defineProps<{
  modelValue: "login" | "register";
}>();

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const updateValue = (newValue: "login" | "register") => {
  value.value = newValue;
  emit("update:modelValue", newValue);
};
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
