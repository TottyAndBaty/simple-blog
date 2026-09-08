<template>
  <div>
    <NuxtLink to="/tags" class="text-blue-600 hover:text-blue-800 mb-6 inline-block">
      &larr; 返回标签列表
    </NuxtLink>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      标签：{{ tag }}
    </h1>
    <p class="text-gray-500 mb-8">共 {{ posts.length }} 篇文章</p>
    <div v-if="posts.length" class="space-y-4">
      <PostCard v-for="post in posts" :key="post._path" :post="post" />
    </div>
    <p v-else class="text-gray-500">该标签下暂无文章</p>
  </div>
</template>


<script setup lang="ts">const route = useRoute();
const tagSlug = route.params.tag as string;

const { data } = await useAsyncData(`tag-${tagSlug}`, async () => {
  const allPosts = await queryContent('/posts').sort({ date: -1 }).find();

  const matchedTag = allPosts
    .flatMap((post) => (post.tags as string[]) ?? [])
    .find((t) => toSlug(t) === tagSlug);
  const originalTag = matchedTag ?? tagSlug;

  const posts = allPosts.filter((post) =>
    ((post.tags as string[]) ?? []).includes(originalTag)
  );

  return { tag: originalTag, posts };
});

const tag = computed(() => data.value?.tag ?? tagSlug);
const posts = computed(() => data.value?.posts ?? []);
</script>