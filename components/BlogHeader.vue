<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <nav class="container mx-auto px-4 max-w-4xl">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          我的博客
        </NuxtLink>
        <div class="flex space-x-6">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            active-class="text-blue-600"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/posts' },
  { label: '标签', to: '/tags' },
  { label: '关于', to: '/about' },
];
</script>
