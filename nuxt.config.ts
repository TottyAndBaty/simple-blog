// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // public 下的值会暴露给客户端，可通过 NUXT_PUBLIC_* 环境变量覆盖
    public: {
      siteName: '我的博客',
      siteDescription: '记录技术成长，分享编程经验。这里是我的个人空间，专注于前端开发与 Web 技术。',
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
  ],

  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['javascript', 'typescript', 'vue', 'bash', 'json', 'yaml', 'markdown'],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },

  compatibilityDate: '2026-09-07',
});
