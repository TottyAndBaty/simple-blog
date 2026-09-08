---
title: "Nuxt.js 3 入门指南"
description: "一篇详细的 Nuxt.js 3 入门教程，涵盖项目结构、路由、数据获取等核心概念。"
date: "2026-09-06"
tags: ["Vue", "Nuxt", "TypeScript","AI博客"]
category: "前端开发"
---

# Nuxt.js 3 入门指南

Nuxt.js 是一个基于 Vue 3 的开源框架，让 Web 开发变得简单而强大。

## 项目初始化

创建一个新的 Nuxt 3 项目非常简单：

```bash
npx nuxi@latest init my-project
cd my-project
npm install
npm run dev
```

## 项目结构

一个典型的 Nuxt 3 项目结构如下：

```
my-project/
├── app.vue          # 根组件
├── nuxt.config.ts   # 配置文件
├── pages/           # 页面路由
├── components/      # 组件
├── composables/     # 组合式函数
├── layouts/         # 布局
└── public/          # 静态资源
```

## 文件路由系统

Nuxt 3 使用基于文件的路由，在 `pages/` 目录下创建 `.vue` 文件即可自动生成路由：

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>首页</h1>
  </div>
</template>

<script setup lang="ts">
// 使用 Composition API
const message = ref('Hello Nuxt!');
</script>
```

动态路由使用方括号命名：

```vue
<!-- pages/posts/[id].vue -->
<template>
  <div>
    <h1>文章详情: {{ id }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
</script>
```

## 数据获取

Nuxt 3 提供了强大的数据获取组合式函数：

```typescript
// 使用 useAsyncData
const { data, pending, error } = await useAsyncData('posts', () => {
  return $fetch('/api/posts');
});

// 使用 useFetch（更简洁）
const { data } = await useFetch('/api/posts');
```

## 组合式函数

在 `composables/` 目录下创建可复用的逻辑：

```typescript
// composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0);
  
  const increment = () => count.value++;
  const decrement = () => count.value--;
  
  return { count, increment, decrement };
};
```

在组件中使用：

```vue
<script setup lang="ts">
const { count, increment, decrement } = useCounter();
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
```

## 总结

Nuxt.js 3 带来了许多令人兴奋的新特性：

- **更好的 TypeScript 支持**
- **更快的热模块替换（HMR）**
- **自动导入** - 组件和组合式函数自动可用
- **混合渲染** - 支持 SSR、SSG、ISR 等多种模式

如果你想深入了解 Nuxt.js 3，建议查阅[官方文档](https://nuxt.com/docs)。
