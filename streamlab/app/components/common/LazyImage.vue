<template>
  <div class="relative overflow-hidden bg-gray-900" :class="layout === 'fill' ? 'inset-0' : ''">
    <img v-if="loaded" :src="src" :alt="alt" class="w-full h-full object-cover transition-opacity duration-300" :class="!loaded ? 'opacity-0' : 'opacity-100'" />
    <div v-if="!loaded && placeholder" class="absolute inset-0 bg-gray-800 animate-pulse" />
    <div v-if="!loaded && !placeholder" class="absolute inset-0 bg-gray-900" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  placeholder?: boolean
  layout?: 'fill' | 'contain' | 'cover'
}>()

const loaded = ref(false)
const observer = ref<IntersectionObserver>()

onMounted(() => {
  const el = document.querySelector(`img[alt="${props.alt}"]`)?.parentElement
  if (!el) { loaded.value = true; return }
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      const img = new Image()
      img.onload = () => { loaded.value = true }
      img.onerror = () => { loaded.value = true }
      img.src = props.src
      observer.value?.disconnect()
    }
  }, { rootMargin: '200px' })
  observer.value.observe(el)
})

onUnmounted(() => observer.value?.disconnect())
</script>