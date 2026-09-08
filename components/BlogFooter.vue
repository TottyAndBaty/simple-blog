<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="container mx-auto px-4 max-w-4xl py-6">
      <p class="text-center text-gray-500 text-sm">
        &copy; {{ currentYear }} {{ siteName }}. 使用 Nuxt.js + Vue 构建.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { public: { siteName } } = useRuntimeConfig();
const currentYear = new Date().getFullYear();
</script>
