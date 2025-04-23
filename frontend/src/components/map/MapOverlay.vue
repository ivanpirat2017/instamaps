<template>
  <VaCard 
    class="map-overlay" 
    v-if="post" 
    @click="goToPost"
    :class="{ clickable: !staticMode }"
  >
    <VaCardTitle>{{ post.title }}</VaCardTitle>
    <VaCardContent>
      <p class="location-text">
        <VaIcon name="place" />
        {{ post.location?.name }}
      </p>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard, VaCardTitle, VaCardContent, VaIcon } from "vuestic-ui";
import { type Post } from "../../stores/post";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{
  post: Post | null;
  staticMode?: boolean;
}>();

const goToPost = () => {
  if (props.post && !props.staticMode) {
    router.push(`/post/${props.post.id}`);
  }
};
</script>

<style scoped lang="scss">
.map-overlay {
  background: rgba(var(--va-background-primary-rgb), 0.9);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow);
  min-width: 200px;
}

.clickable {
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.location-text {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--va-text-secondary);
  
  .va-icon {
    font-size: 16px;
  }
}
</style>
