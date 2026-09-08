<template>
  <div>
    <ContentDoc path="/about" class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
      <template #not-found>
        <div class="text-center py-12">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">页面未找到</h1>
          <p class="text-gray-600">关于页面内容尚未创建。</p>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于我',
});
</script>
