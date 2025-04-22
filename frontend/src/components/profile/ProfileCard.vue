<template>
  <section class="profile-card">
    <VaAvatar src="https://via.placeholder.com/120" size="large" />
    <h2>@{{ user?.username || "traveler" }}</h2>
    <p>{{ $t("app.profileBio") }}</p>
    <div class="tags">
      <VaChip v-for="tag in profileTags" :key="tag" color="primary"> #{{ tag }} </VaChip>
    </div>
  </section>
</template>

<script setup lang="ts">
import { VaAvatar, VaChip } from "vuestic-ui";

defineProps<{
  user: { username: string } | null;
}>();

const profileTags = ["nature", "travel", "photo"];
</script>

<style scoped>
.profile-card {
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow);
  text-align: center;
  margin-bottom: 16px;

  h2 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 6px;
  }

  p {
    font-size: 0.95rem;
    color: #6b7280;
    margin-bottom: 12px;
  }
}
</style>
