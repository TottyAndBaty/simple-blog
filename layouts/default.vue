<template>
  <div class="min-h-screen flex flex-col">
    <BlogHeader />
    <main class="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <slot />
    </main>
    <BlogFooter />
  </div>
</template>
