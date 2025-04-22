<template>
  <div class="profile-card">
    <div class="profile-header">
      <div class="avatar-container">
        <img :src="user.avatar" :alt="user.username" class="avatar" />
      </div>
      <div class="profile-info">
        <h2 class="username">{{ user.username }}</h2>
        <p class="bio">{{ user.bio || $t("app.profileBio") }}</p>
        <p class="join-date">{{ $t("app.joinedOn") }}: {{ formatDate(user.joinDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "../../stores/auth";

const props = defineProps<{
  user: User;
}>();

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU").format(date);
}
</script>

<style scoped lang="scss">
.profile-card {
  background: var(--white-transparent);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
}

.profile-header {
  display: flex;
  gap: 24px;
  align-items: center;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
}

.profile-info {
  flex-grow: 1;
}

.username {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.bio {
  color: var(--primary-color);
  opacity: 0.8;
  margin-bottom: 8px;
  line-height: 1.5;
}

.join-date {
  font-size: 0.9rem;
  color: var(--primary-color);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
