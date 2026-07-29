<template>
  <div ref="trigger" class="flex justify-center py-8">
    <div v-if="isLoading" class="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    <p v-else class="text-gray-500 text-sm">Scroll for more</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isLoaded?: boolean
  isLoading?: boolean
}>(), { isLoaded: false, isLoading: false })

const emit = defineEmits<{
  load: []
}>()

const trigger = ref<HTMLElement>()

onMounted(() => {
  if (!trigger.value) return
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && isLoaded.value && !isLoading.value) emit('load')
  }, { rootMargin: '300px' })
  obs.observe(trigger.value)
})
</script>