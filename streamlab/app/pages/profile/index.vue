<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">My Profile</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-[#141420] rounded-xl p-6 border border-white/10">
        <h2 class="text-lg font-semibold mb-4">Account</h2>
        <p class="text-gray-400 mb-4">{{ user?.email }}</p>
        <button @click="handleLogout" class="text-red-400 hover:text-red-300 text-sm underline">Sign Out</button>
      </div>

      <div class="md:col-span-2">
        <h2 class="text-lg font-semibold mb-4">Continue Watching</h2>
        <div v-if="items.length === 0" class="text-gray-500 text-sm">No items yet — start watching something!</div>
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div v-for="item in items" :key="item.contentId" class="bg-white/5 rounded-xl p-4 border border-white/10 relative group">
            <img :src="item.poster" :alt="item.title" class="w-full h-32 object-cover rounded-lg mb-3" />
            <h3 class="font-semibold text-sm truncate">{{ item.title }}</h3>
            <div class="mt-2 bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div class="bg-red-500 h-full rounded-full" :style="{ width: `${(item.progress || 0) * 100}%` }" />
            </div>
            <span class="text-xs text-gray-400 mt-1 block">{{ Math.round((item.progress || 0) * 100) }}%</span>
            <button @click="removeItem(item.contentId)" class="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white text-xs w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition">×</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const { items, remove } = useContinueWatching()
const user = computed(() => auth.user)

function handleLogout() { navigateTo('/auth/login') }
function removeItem(id: string) { remove(id) }
</script>