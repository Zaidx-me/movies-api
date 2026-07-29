<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white font-sans">
    <AppHeader />
    <main class="pt-16">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/Header.vue'
import AppFooter from '~/components/layout/Footer.vue'

useHead({
  title: 'StreamLab',
  meta: [
    { name: 'description', content: 'StreamLab — Professional Movie Streaming Platform' },
    { property: 'og:title', content: 'StreamLab' },
    { property: 'og:description', content: 'Professional Movie Streaming Platform' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>