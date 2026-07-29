<template>
  <div class="fixed inset-0 bg-black z-50 flex flex-col">
    <a :href="`/movie/${detailPath}`" class="absolute top-4 left-4 z-50 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition">← Back</a>
    <div class="flex-1 flex items-center justify-center">
      <iframe v-if="netfilmUrl" :src="netfilmUrl" class="w-full h-full border-0" allowfullscreen allow="autoplay; fullscreen" />
      <div v-else class="text-gray-400 p-8">No stream available for this title.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string
const detailPath = (route.query.detail_path as string) || ''

const netfilmUrl = `https://netfilm.world/spa/videoPlayPage/movies/${encodeURIComponent(detailPath)}?id=${encodeURIComponent(id)}&detailSe=&detailEp=&lang=en&type=%2Fmovie%2Fdetail&page_from=streamlab`
</script>