<template>
  <div class="search-bar">
    <VaInput
      v-model="value"
      :placeholder="$t('app.searchPlaceholder')"
      class="flex-grow"
      @input="debouncedSearch"
    />
    <VaButton @click="$emit('search')">{{ $t("app.search") }}</VaButton>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { VaInput, VaButton } from "vuestic-ui";
import { debounce } from "lodash";

const props = defineProps<{
  value: string;
}>();
const value = toRef(props.value);

const emit = defineEmits(["update:value", "search"]);

const debouncedSearch = debounce((newValue: string) => {
  emit("update:value", newValue);
}, 300);
</script>
