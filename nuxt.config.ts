// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
