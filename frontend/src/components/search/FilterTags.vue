<template>
  <div class="filter-tags">
    <VaChip
      v-for="tag in tags"
      :key="tag"
      :color="value === tag ? 'primary' : 'background'"
      :outline="value !== tag"
      @click="$emit('filter', tag)"
    >
      {{ tag }}
    </VaChip>
  </div>
</template>

<script setup lang="ts">
import { VaChip } from "vuestic-ui";

defineProps<{
  tags: string[];
  value: string | null;
}>();
defineEmits(["filter"]);
</script>

<style scoped>
.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
</style>
