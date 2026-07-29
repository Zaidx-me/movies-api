<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center font-bold text-lg">S</div>
        <span class="font-bold text-xl hidden sm:block">StreamLab</span>
      </NuxtLink>
      <div class="flex-1 max-w-md mx-8 hidden md:block">
        <SearchInput />
      </div>
      <div class="flex items-center gap-4">
        <template v-if="auth.isAuthenticated">
          <NuxtLink to="/profile" class="text-gray-300 hover:text-white text-sm font-medium">Profile</NuxtLink>
          <button @click="handleLogout" class="text-gray-300 hover:text-white text-sm font-medium">Sign Out</button>
        </template>
        <template v-else>
          <NuxtLink to="/auth/login" class="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold text-sm transition">Sign In</NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const auth = useAuthStore()
function handleLogout() { auth.clear(); navigateTo('/auth/login') }
</script>