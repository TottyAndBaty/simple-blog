# Personal Blog

一个基于 **Nuxt 3** 构建的个人技术博客，使用 `@nuxt/content` 以 Markdown 管理文章，`Tailwind CSS` 负责样式。支持文章列表、分类、标签、代码高亮等功能，并通过 `nuxt generate` 输出纯静态站点。
<p align="center">
  <img src="/assets/preview.png" alt="预览">
</p>
## ✨ 特性

- 📝 **Markdown 内容驱动**：文章、关于页均以 Markdown 编写，由 `@nuxt/content` 渲染
- 🏷️ **分类与标签**：自动聚合文章分类、标签，支持按分类/标签浏览
- 🎨 **Tailwind CSS + Typography**：实用优先的样式方案，文章正文排版美观
- 🌈 **代码高亮**：基于 Shiki，内置 `github-dark` 主题，支持多种语言
- 🀄 **中文路由拼音化**：URL 全程使用纯 ASCII 拼音 slug，规避静态生成时中文路径导致的 500 错误（详见下文）
- ⚡ **静态站点生成（SSG）**：`nuxt generate` 输出可直接部署的静态文件

## 🛠️ 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Nuxt 3（基于 Vue 3） |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + `@tailwindcss/typography` |
| 内容 | `@nuxt/content` |
| 拼音转换 | `pinyin-pro` |

## 📦 环境要求

- Node.js >= 18（推荐 20+）
- npm

## 🚀 快速开始

```bash
# 安装依赖（postinstall 会自动执行 nuxt prepare）
npm install

# 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

### 可用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器，支持热更新 |
| `npm run build` | 构建生产版本（SSR，输出到 `.output/`） |
| `npm run generate` | 静态站点生成（SSG，输出到 `.output/public/`） |
| `npm run preview` | 本地预览构建产物 |

## 📁 目录结构

```
.
├── assets/css/          # 全局样式（Tailwind 入口 main.css）
├── components/          # 可复用组件
│   ├── BlogHeader.vue   # 顶部导航
│   ├── BlogFooter.vue   # 页脚
│   ├── PostCard.vue     # 文章卡片
│   └── TagBadge.vue     # 标签徽章
├── content/             # Markdown 内容
│   ├── posts/           # 文章
│   └── about.md         # 关于页
├── layouts/             # 布局
│   └── default.vue
├── pages/               # 文件路由
│   ├── index.vue            # 首页（最新文章）
│   ├── about.vue            # 关于
│   ├── posts/               # 文章列表与详情
│   ├── categories/[category].vue  # 分类归档
│   └── tags/                # 标签列表与归档
├── utils/
│   └── slug.ts          # 中文转拼音 slug 工具
├── nuxt.config.ts
└── tailwind.config.js
```

## 📝 编写文章

在 `content/posts/` 下新建 `.md` 文件，通过 front-matter 声明元信息：

```markdown
---
title: "文章标题"
description: "文章摘要"
date: "2026-09-08"
tags: ["Vue", "Nuxt"]
category: "前端开发"
---

# 正文标题

这里写 Markdown 正文……
```

- `date`：用于列表排序（倒序）
- `tags`：字符串数组，文章可归属多个标签
- `category`：字符串，单个分类

## 🀄 中文路由拼音化方案（重要）

`@nuxt/content` 的分类/标签常为中文（如 `前端开发`）。若直接把中文放进 URL，在 `nuxt generate` 预渲染阶段，Nitro 会把路径写入 HTTP 响应头，而 HTTP 头必须是 ByteString（字符值 ≤ 255），中文会导致：

```
TypeError: Cannot convert argument to a ByteString
```

从而触发 500 错误。本项目的解决方案：

1. **生成端**：`utils/slug.ts` 的 `toSlug()` 用 `pinyin-pro` 将中文转为纯 ASCII 拼音 slug（如 `前端开发` → `qian-duan-kai-fa`）。`PostCard.vue`、`TagBadge.vue`、`pages/tags/index.vue` 等生成链接时统一调用。
2. **消费端**：`pages/categories/[category].vue`、`pages/tags/[tag].vue` 从 URL 读到的是拼音 slug。由于拼音不可逆，页面会遍历所有文章的分类/标签，用 `toSlug()` 计算并反查匹配出原始中文，再进行显示与过滤。

> 结果：URL 全程纯 ASCII（规避 Nitro 写头越界），页面显示仍为中文。

## 🌐 静态资源路径（部署注意）

打包产物默认以绝对路径（`/_nuxt/...`）引用资源。若**直接双击 `index.html` 用 `file://` 打开**或**部署到子目录**，会因路径解析到根目录而导致样式/脚本 404。可按需在 `nuxt.config.ts` 中配置：

```ts
app: {
  baseURL: './',        // 相对路径，适合 file:// 或任意子目录
  // baseURL: '/blog/', // 部署到固定子目录时使用具体前缀
}
```

本地查看静态产物推荐使用 HTTP 服务器而非直接打开文件：

```bash
npx serve .output/public
```

## 📄 License

个人项目，供学习与参考。
# simple-blog
