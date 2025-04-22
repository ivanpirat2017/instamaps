<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <VaIcon name="search" color="primary" />
      <VaInput
        v-model="localValue"
        :placeholder="$t('app.searchPlaceholder')"
        class="search-input"
        clearable
        @update:modelValue="handleInput"
        @keyup.enter="$emit('search')"
      />
      <VaButton
        icon="tune"
        preset="plain"
        class="filter-button"
        @click="showFilters = !showFilters"
      />
    </div>

    <Transition name="fade">
      <div v-if="showFilters" class="search-filters">
        <div class="filter-group">
          <label>Сортировка:</label>
          <div class="filter-options">
            <VaRadio v-model="sortOption" label="По дате" value="date" />
            <VaRadio v-model="sortOption" label="По популярности" value="popular" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { VaInput, VaButton, VaIcon, VaRadio } from "vuestic-ui";
import { debounce } from "lodash";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue", "search", "update:sort"]);

const localValue = ref(props.modelValue);
const showFilters = ref(false);
const sortOption = ref("date");

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

const handleInput = debounce((value: string) => {
  emit("update:modelValue", value);
}, 300);

watch(sortOption, (newValue) => {
  emit("update:sort", newValue);
});
</script>

<style scoped lang="scss">
.search-bar {
  background: var(--white-transparent);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--white-transparent);
  border-radius: 8px;
  padding: 8px 12px;
  outline: none;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--primary-color);
  font-size: 1rem;

 
 
}

.filter-button {
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.search-filters {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.filter-group {
  label {
    display: block;
    font-size: 0.9rem;
    color: var(--primary-color);
    margin-bottom: 8px;
  }
}

.filter-options {
  display: flex;
  gap: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
