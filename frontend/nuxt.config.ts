import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	modules: ['@nuxt/ui', '@pinia/nuxt'],
	css: ['~/assets/css/main.css'],
	devtools: { enabled: true },
})
