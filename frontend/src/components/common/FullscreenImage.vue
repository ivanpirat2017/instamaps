<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fullscreen-image" @click="close">
      <div class="toolbar">
        <VaButton preset="plain" icon="close" color="white" @click="close" />
      </div>
      <img :src="src" :alt="alt" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { VaButton } from "vuestic-ui";

defineProps<{
  modelValue: boolean;
  src: string;
  alt: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function close() {
  emit("update:modelValue", false);
}
</script>

<style scoped lang="scss">
.fullscreen-image {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;

  img {
    max-width: 95vw;
    max-height: 95vh;
    object-fit: contain;
    user-select: none;
  }
}

.toolbar {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
