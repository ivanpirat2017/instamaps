<template>
  <VaTabs grow>
    <VaTab @click="updateValue('login')">{{ $t("app.login") }}</VaTab>
    <VaTab @click="updateValue('register')">{{ $t("app.register") }}</VaTab>
  </VaTabs>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
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
