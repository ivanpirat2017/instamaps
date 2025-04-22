<template>
  <div class="AuthTabs">
    <span :class="value == 'login' ? 'AuthTabsActive' : 'AuthTabsDisabled'" @click="updateValue('login')">{{
      $t("app.loginTitle")
    }}</span>
    <span :class="value == 'register' ? 'AuthTabsActive' : 'AuthTabsDisabled'" @click="updateValue('register')">{{
      $t("app.registerTitle")
    }}</span>
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

<style scoped lang="scss">
.AuthTabs {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: var(--white-transparent);
  border-radius: 8px;
  gap: 10px;
  span {
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    transition: color 0.3s ease;
    user-select: none;
  }
  &Active {
    color: var(--accent-color);
  }
  &Disabled {
    color: var(--primary-color);
  }
}
</style>
