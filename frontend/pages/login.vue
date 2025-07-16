<template>
	<div
		class="flex flex-col md:flex-row max-w-3xl md:mx-auto mx-6 mt-50 rounded-3xl shadow-2xl border border-gray-800 bg-white/10 overflow-hidden">
		<!-- Left: Animation/Video (hidden on mobile) -->
		<div
			class="hidden md:flex w-1/2 bg-gradient-to-br from-emerald-500/40 to-emerald-900/60 items-center justify-center p-8 relative">
			<!-- Tutaj wrzuć animację np. video lub canvas lub SVG -->
			<!-- <video
		  v-if="false"     
		  src="/videos/coins-falling.webm"
		  autoplay
		  loop
		  muted
		  playsinline
		  class="w-full h-auto max-h-72 rounded-2xl shadow-2xl object-cover"
		/> -->
			<!-- Przykładowa ilustracja zastępcza -->
			<svg width="180" height="180" viewBox="0 0 200 200" fill="none">
				<circle cx="100" cy="100" r="100" fill="#059669" fill-opacity="0.13" />
				<g>
					<ellipse cx="100" cy="140" rx="60" ry="18" fill="#a7f3d0" />
					<circle cx="85" cy="90" r="18" fill="#FFD700" />
					<circle cx="130" cy="65" r="10" fill="#60a5fa" />
					<circle cx="115" cy="110" r="9" fill="#f59e42" />
				</g>
			</svg>
		</div>
		<!-- Right: Login form -->
		<div class="w-full md:w-1/2 bg-white/10 p-8 flex flex-col justify-center">
			<div class="flex items-center gap-2 mb-5 justify-center">
				<UIcon name="i-heroicons-lock-closed" class="w-7 h-7 text-emerald-400" />
				<h1 class="text-2xl font-bold text-white">Sign in to your account</h1>
			</div>
			<form @submit.prevent="login" class="flex flex-col gap-4">
				<div>
					<label class="block text-sm font-semibold text-gray-300 mb-1">Email</label>
					<UInput v-model="email" placeholder="Enter your email" type="email" class="mb-2 w-full" />
				</div>
				<div>
					<label class="block text-sm font-semibold text-gray-300 mb-1">Password</label>
					<UInput v-model="password" placeholder="Enter your password" type="password" class="mb-2 w-full" />
				</div>
				<UButton type="submit" block :loading="loading" class="mt-2">Sign in</UButton>
				<div class="flex items-center mt-2 justify-center">
					<RouterLink to="/register" class="text-emerald-300 hover:underline text-sm">
						Don't have an account? Register
					</RouterLink>
				</div>
				<UAlert v-if="error" color="error" variant="outline" class="mt-3" :description="error" />
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { API_BASE } from '~/lib/api'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const { setUser } = useAuth()

const login = async () => {
	error.value = ''
	loading.value = true
	try {
		const res = await fetch(`${API_BASE}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.value, password: password.value }),
		})
		const data = await res.json()
		if (!res.ok) throw new Error(data.error || 'Login failed')
		setUser(data.user, data.token)
		await router.push('/dashboard')
	} catch (e: any) {
		error.value = e.message
	} finally {
		loading.value = false
	}
}
</script>
