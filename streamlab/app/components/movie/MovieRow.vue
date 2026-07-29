<template>
  <section class="mb-10">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
      <div v-for="item in items" :key="item.slug" class="min-w-[160px] sm:min-w-[200px] snap-start">
        <MovieCard :title="item.name" :poster="item.poster_url" :slug="item.slug" :badge="item.badge" :rating="item.rating" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieCard from './MovieCard.vue'
defineProps<{
  title: string
  items: any[]
}>()
</script>