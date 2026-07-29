<template>
  <div class="relative w-full max-w-xl mx-auto">
    <input v-model="query" @input="onInput" @keydown.escape="clear" type="text" :placeholder="placeholder" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-white focus:outline-none focus:border-red-500 transition pr-10" />
    <button v-if="query" @click="clear" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
    <div v-if="suggestions.length && query.length >= 2" class="absolute top-full left-0 right-0 mt-2 bg-[#141420] rounded-xl border border-white/10 shadow-xl overflow-hidden z-50">
      <NuxtLink v-for="s in suggestions" :key="s.slug" :to="`/movie/${s.slug}`" class="block px-4 py-3 hover:bg-white/5 transition text-sm">{{ s.title }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
}>(), { placeholder: 'Search movies...' })

const emit = defineEmits<{
  search: [q: string]
}>()

const query = ref(modelValue || '')
const suggestions = ref<any[]>([])
const { getSuggestions } = useMovieboxApi()
let debounce: ReturnType<typeof setTimeout>

watch(() => modelValue, (v) => { query.value = v || '' })

async function onInput() {
  emit('update:modelValue', query.value)
  clearTimeout(debounce)
  debounce = setTimeout(async () => {
    if (query.value.length < 2) { suggestions.value = []; return }
    try { const res = await getSuggestions(query.value); suggestions.value = res.suggestions || [] } catch { suggestions.value = [] }
  }, 300)
}

function clear() { query.value = ''; suggestions.value = []; emit('search', '') }
</script>