<template>
  <VaButton
    preset="plain"
    icon="menu"
    class="burger"
    :class="{ active: isOpen }"
    @click="$emit('toggle')"
    aria-label="Toggle menu"
  />
</template>

<script setup lang="ts">
import { VaButton } from 'vuestic-ui';
defineProps<{
  isOpen: boolean;
}>();
defineEmits(['toggle']);
</script>

<style scoped>
.burger {
  display: flex;
}
</style>