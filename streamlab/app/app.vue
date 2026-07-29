<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/logo.svg' }],
  meta: [
    { name: 'description', content: 'StreamLab - Your ultimate movie streaming platform' },
    { name: 'theme-color', content: '#0a0a0f' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>