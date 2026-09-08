<template>
  <article class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <h2 class="text-xl font-semibold text-gray-900 mb-2">
      <NuxtLink :to="post._path" class="hover:text-blue-600 transition-colors">
        {{ post.title }}
      </NuxtLink>
    </h2>
    <p class="text-gray-600 mb-4 line-clamp-2">{{ post.description }}</p>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <time class="text-sm text-gray-400">{{ formatDate(post.date) }}</time>
        <NuxtLink
          v-if="post.category"
          :to="`/categories/${toSlug(post.category)}`"
          class="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
        >
          {{ post.category }}
        </NuxtLink>
      </div>
      <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
        <TagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Post {
  _path: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  category?: string;
}

defineProps<{
  post: Post;
}>();

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
