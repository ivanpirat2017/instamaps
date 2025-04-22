<template>
  <div class="filter-tags-container">
    <TransitionGroup name="tag-list" tag="div" class="filter-tags">
      <VaChip
        v-for="tag in tags"
        :key="tag"
        :color="value === tag ? 'primary' : 'secondary'"
        :class="{
          'filter-tag': true,
          'is-active': value === tag,
        }"
        @click="$emit('filter', tag)"
      >
        <template #prepend>
          <VaIcon
            :name="value === tag ? 'check_circle' : 'local_offer'"
            :color="value === tag ? 'white' : 'primary'"
            size="small"
          />
        </template>
        {{ tag }}
      </VaChip>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { VaChip, VaIcon } from "vuestic-ui";

defineProps<{
  tags: string[];
  value: string | null;
}>();

defineEmits(["filter"]);
</script>

<style scoped lang="scss">
.filter-tags-container {
  position: relative;
  padding: 4px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 6px 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
  }

  &.is-active {
    transform: translateY(-2px);
    font-weight: 600;
  }
}

/* Анимации для тегов */
.tag-list-move,
.tag-list-enter-active,
.tag-list-leave-active {
  transition: all 0.3s ease;
}

.tag-list-enter-from,
.tag-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.tag-list-leave-active {
  position: absolute;
}
</style>
