<template>
  <div class="filter-tags">
    <VaChip
      v-for="tag in tags"
      :key="tag"
      :color="isSelected(tag) ? 'primary' : 'gray'"
      class="tag"
      closeable
      @click="toggleTag(tag)"
    >
      #{{ tag }}
    </VaChip>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VaChip } from "vuestic-ui";

const props = defineProps<{
  modelValue: string[];
  tags: string[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

function isSelected(tag: string) {
  return props.modelValue?.includes(tag);
}

function toggleTag(tag: string) {
  const currentValue = props.modelValue || [];
  const newValue = currentValue.includes(tag)
    ? currentValue.filter((t) => t !== tag)
    : [...currentValue, tag];
  emit("update:modelValue", newValue);
}
</script>

<style scoped lang="scss">
.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.tag {
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>
