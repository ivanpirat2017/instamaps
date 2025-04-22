<template>
  <VaCard class="map-overlay" v-if="post">
    <VaCardTitle>{{ post.title }}</VaCardTitle>
    <VaCardContent>
      <p>{{ $t("app.location") }}: {{ post.location?.lat }}, {{ post.location?.lng }}</p>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard, VaCardTitle, VaCardContent } from "vuestic-ui";
import { type Post } from "../../stores/post";

defineProps<{
  post: Post | null;
}>();
</script>
