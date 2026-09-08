<template>
  <div>
    <NuxtLink to="/posts" class="text-blue-600 hover:text-blue-800 mb-6 inline-block">
      &larr; 返回文章列表
    </NuxtLink>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      分类：{{ category }}
    </h1>
    <p class="text-gray-500 mb-8">共 {{ posts.length }} 篇文章</p>
    <div v-if="posts.length" class="space-y-4">
      <PostCard v-for="post in posts" :key="post._path" :post="post" />
    </div>
    <p v-else class="text-gray-500">该分类下暂无文章</p>
  </div>
</template>

<script setup lang="ts">const route = useRoute();
const categorySlug = route.params.category as string;

const { data } = await useAsyncData(`category-${categorySlug}`, async () => {
  const allPosts = await queryContent('/posts').sort({ date: -1 }).find();

  const matched = allPosts.find(
    (post) => post.category && toSlug(post.category as string) === categorySlug
  );
  const originalCategory = (matched?.category as string) ?? categorySlug;

  const posts = allPosts.filter((post) => post.category === originalCategory);

  return { category: originalCategory, posts };
});

const category = computed(() => data.value?.category ?? categorySlug);
const posts = computed(() => data.value?.posts ?? []);
</script>
