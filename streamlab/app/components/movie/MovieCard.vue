<template>
  <NuxtLink :to="`/movie/${slug}`" class="group block">
    <div class="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg group-hover:shadow-red-500/10">
      <div class="aspect-[2/3] relative overflow-hidden bg-black">
        <LazyImage :src="poster" :alt="title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span class="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">▶ Play</span>
        </div>
      </div>
      <div class="p-3">
        <h3 class="font-semibold text-sm truncate group-hover:text-red-400 transition">{{ title }}</h3>
        <div class="flex items-center gap-2 mt-1">
          <span v-if="badge" class="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded">{{ badge }}</span>
          <span v-if="rating" class="text-yellow-400 text-xs font-bold">★ {{ rating }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  poster: string
  slug: string
  badge?: string
  rating?: string
}>()
</script>