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
