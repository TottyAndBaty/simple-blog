<template>
  <div>
    <NuxtLink to="/posts" class="text-blue-600 hover:text-blue-800 mb-6 inline-block">
      &larr; 返回文章列表
    </NuxtLink>

    <ContentDoc>
      <template #default="{ doc }">
        <article>
          <header class="mb-8 border-b border-gray-200 pb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">{{ doc.title }}</h1>
            <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <time>{{ formatDate(doc.date) }}</time>
              <NuxtLink
                v-if="doc.category"
                :to="`/categories/${toSlug(doc.category)}`"
                class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                {{ doc.category }}
              </NuxtLink>
            </div>
            <div v-if="doc.tags?.length" class="flex flex-wrap gap-2 mt-4">
              <TagBadge v-for="tag in doc.tags" :key="tag" :tag="tag" />
            </div>
          </header>

          <ContentRenderer
            :value="doc"
            class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-code:text-gray-800 prose-pre:bg-gray-900"
          />
        </article>
      </template>

      <template #not-found>
        <div class="text-center py-12">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <p class="text-gray-600">抱歉，您访问的文章不存在。</p>
          <NuxtLink to="/posts" class="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            返回文章列表
          </NuxtLink>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
  queryContent(route.path).findOne()
);

useHead({
  title: post.value?.title || '文章详情',
  meta: [
    { name: 'description', content: post.value?.description || '' },
  ],
});

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
