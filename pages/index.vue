<template>
  <div>
    <!-- Hero Section -->
    <section class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">欢迎来到我的博客</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        记录技术成长，分享编程经验。这里是我的个人空间，专注于前端开发与 Web 技术。
      </p>
      <div class="mt-6">
        <NuxtLink
          to="/posts"
          class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          浏览文章
        </NuxtLink>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="py-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">最新文章</h2>
      <div v-if="posts.length" class="space-y-4">
        <PostCard v-for="post in posts" :key="post._path" :post="post" />
      </div>
      <p v-else class="text-gray-500">暂无文章</p>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('latest-posts', () =>
  queryContent('/posts')
    .sort({ date: -1 })
    .limit(5)
    .find()
);
</script>
