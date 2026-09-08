<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">所有文章</h1>
    <div v-if="posts.length" class="space-y-4">
      <PostCard v-for="post in posts" :key="post._path" :post="post" />
    </div>
    <p v-else class="text-gray-500">暂无文章</p>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('/posts')
    .sort({ date: -1 })
    .find()
);
</script>
