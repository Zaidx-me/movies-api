<template>
  <div>
    <div class="flex gap-2 mb-6 overflow-x-auto">
      <button v-for="s in seasons" :key="s.seasonNumber" @click="selectedSeason = s.seasonNumber" class="px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition" :class="selectedSeason === s.seasonNumber ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20'">
        Season {{ s.seasonNumber }}
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="ep in currentEpisodes" :key="ep.episodeNumber" class="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-red-500/50 transition cursor-pointer group" @click="goToPlayer(ep)">
        <span class="text-xs text-gray-500">S{{ ep.seasonNumber }}E{{ ep.episodeNumber }}</span>
        <h3 class="font-semibold mt-1 group-hover:text-red-400 transition">{{ ep.title }}</h3>
        <p v-if="ep.description" class="text-gray-500 text-sm mt-1 line-clamp-2">{{ ep.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  seasons: any[]
  title: string
  id: string
  slug: string
}>()

const selectedSeason = ref(1)
const currentEpisodes = computed(() => {
  const season = props.seasons.find(s => s.seasonNumber === selectedSeason.value)
  return season?.episodes || []
})

function goToPlayer(ep: any) {
  navigateTo(`/player/${props.id}?detail_path=${props.slug}&se=${ep.seasonNumber}&ep=${ep.episodeNumber}`)
}
</script>