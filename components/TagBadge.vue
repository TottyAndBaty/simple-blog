<template>
  <NuxtLink
    :to="`/tags/${toSlug(tag)}`"
    class="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
  >
    {{ tag }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>
