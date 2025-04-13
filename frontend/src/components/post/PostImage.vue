<template>
  <img v-lazy="src" :alt="alt" class="w-full rounded-lg" loading="lazy" decoding="async" />
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
}>();
</script>
