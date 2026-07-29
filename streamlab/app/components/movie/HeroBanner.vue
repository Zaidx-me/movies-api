<template>
  <section class="relative rounded-3xl overflow-hidden mb-10" style="min-height:400px">
    <img :src="movies[0]?.poster_url" :alt="movies[0]?.name" class="absolute inset-0 w-full h-full object-cover opacity-30" />
    <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex items-center p-8 md:p-16">
      <div class="max-w-lg">
        <span class="bg-red-500 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">{{ movies[0]?.badge || 'Featured' }}</span>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">{{ movies[0]?.name }}</h1>
        <p v-if="movies[0]?.rating" class="text-yellow-400 font-bold mb-4">★ {{ movies[0].rating }}</p>
        <div class="flex gap-4">
          <NuxtLink :to="`/player/${movies[0]?.subject_id}?detail_path=${movies[0]?.slug}`" class="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-bold transition">▶ Watch Now</NuxtLink>
        </div>
      </div>
    </div>
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button v-for="(_, i) in movies" :key="i" class="w-3 h-3 rounded-full transition" :class="i === 0 ? 'bg-red-500 w-8' : 'bg-white/40 hover:bg-white/70'" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  movies: any[]
}>()
</script>