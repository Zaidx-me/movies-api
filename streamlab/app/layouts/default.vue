<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white font-sans">
    <Header />
    <main class="pt-16">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
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