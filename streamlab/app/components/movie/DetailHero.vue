<template>
  <div class="relative rounded-2xl overflow-hidden mb-8" style="min-height:300px; background:#1a1a2e">
    <img :src="poster" :alt="title" class="w-full h-64 md:h-80 object-cover opacity-30" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
      <h1 class="text-3xl font-bold mb-2">{{ title }}</h1>
      <div v-if="rating" class="flex items-center gap-2 mb-4">
        <span class="text-yellow-400 font-bold">★ {{ rating }}</span>
        <span v-if="duration" class="text-gray-400 text-sm">{{ duration }} min</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  poster: string
  rating?: string
  duration?: number
}>()
</script>