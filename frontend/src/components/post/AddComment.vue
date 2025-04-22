<template>
  <form class="add-comment-form" @submit.prevent="handleSubmit">
    <VaInput v-model="commentText" :placeholder="$t('app.writeComment')" class="comment-input" />
    <VaButton type="submit" :disabled="!commentText.trim()" :loading="isSubmitting" size="small">
      {{ $t("app.submit") }}
    </VaButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VaInput, VaButton } from "vuestic-ui";
import { usePostStore } from "../../stores/post";
import { useAuthStore } from "../../stores/auth";
import { type Post } from "../../stores/post";
import { showToast } from "../../utils/toast";

const props = defineProps<{
  post: Post;
}>();

const postStore = usePostStore();
const authStore = useAuthStore();
const commentText = ref("");
const isSubmitting = ref(false);

async function handleSubmit() {
  if (!authStore.user) return;

  if (commentText.value.trim()) {
    isSubmitting.value = true;
    try {
      await postStore.addComment(props.post.id, {
        userId: authStore.user.id,
        user: authStore.user.username,
        text: commentText.value.trim(),
      });
      commentText.value = "";
      showToast("Комментарий добавлен", "success");
    } catch (error) {
      showToast("Ошибка при добавлении комментария", "error");
    } finally {
      isSubmitting.value = false;
    }
  }
}
</script>

<style scoped lang="scss">
.add-comment-form {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.comment-input {
  flex-grow: 1;
}
</style>
