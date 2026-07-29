<template>
  <div class="flex items-center justify-center min-h-screen bg-[#0a0a0f] text-white p-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4">{{ error?.statusCode || 500 }}</h1>
      <p class="text-gray-400 mb-8">{{ error?.message || 'Something went wrong' }}</p>
      <NuxtLink to="/" class="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition">Go Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError()
</script>