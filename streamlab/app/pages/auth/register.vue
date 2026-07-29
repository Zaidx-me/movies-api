<template>
  <div class="flex items-center justify-center min-h-screen bg-[#0a0a0f] p-4">
    <div class="bg-[#141420] rounded-2xl p-8 w-full max-w-md border border-white/10">
      <h1 class="text-3xl font-bold mb-2 text-center">StreamLab</h1>
      <p class="text-gray-400 text-center mb-8">{{ $t('auth.register') }}</p>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-300">Name</label>
          <input v-model="name" type="text" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-300">Email</label>
          <input v-model="email" type="email" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-300">Password</label>
          <input v-model="password" type="password" required minlength="6" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition" />
        </div>
        <div v-if="error" class="text-red-400 text-sm text-center">{{ error }}</div>
        <button type="submit" :disabled="submitting" class="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition">
          {{ submitting ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>
      <p class="text-center text-gray-500 text-sm mt-6">
        Already have an account? <NuxtLink to="/auth/login" class="text-blue-400 hover:underline">Sign In</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)
const { register } = useAuth()

async function handleRegister() {
  error.value = ''
  submitting.value = true
  try {
    await register(name.value, email.value, password.value)
    navigateTo('/')
  } catch (e: any) {
    error.value = e?.message || 'Registration failed'
  } finally {
    submitting.value = false
  }
}
</script>