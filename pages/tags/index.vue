<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">所有标签</h1>
    <div v-if="tags.length" class="flex flex-wrap gap-3">
      <NuxtLink
        v-for="tag in tags"
        :key="tag"
        :to="`/tags/${toSlug(tag)}`"
        class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors font-medium"
      >
        {{ tag }}
      </NuxtLink>
    </div>
    <p v-else class="text-gray-500">暂无标签</p>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('tags-posts', () =>
  queryContent('/posts').find()
);

const tags = computed(() => {
  if (!posts.value) return [];
  const tagSet = new Set<string>();
  posts.value.forEach((post: any) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
});
</script>
