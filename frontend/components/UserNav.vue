<template>
	<header class="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/70 shadow transition">
		<div class="flex items-center gap-3 py-3 px-4 md:px-8 max-w-7xl mx-auto">
			<!-- Logo -->
			<div class="logo flex-shrink-0">
				<svg width="40" height="40" viewBox="0 0 200 200" fill="none">
					<circle cx="100" cy="100" r="100" fill="#059669" fill-opacity="0.13" />
					<g>
						<ellipse cx="100" cy="140" rx="60" ry="18" fill="#a7f3d0" />
						<circle cx="85" cy="90" r="18" fill="#FFD700" />
						<circle cx="130" cy="65" r="10" fill="#60a5fa" />
						<circle cx="115" cy="110" r="9" fill="#f59e42" />
					</g>
				</svg>
			</div>
			<!-- Napis -->
			<span class="text-xl md:text-2xl font-bold tracking-tight text-emerald-600 select-none">
				airdrop<span class="text-blue-500">app</span>
			</span>

			<!-- Hamburger (mobile only) -->
			<button
				class="ml-auto flex md:hidden items-center justify-center w-10 h-10 rounded-xl focus:outline-none transition hover:bg-emerald-50 dark:hover:bg-slate-800"
				@click="open = !open"
				aria-label="Open menu">
				<span v-if="!open">
					<svg
						class="w-7 h-7 text-emerald-700 dark:text-blue-100"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</span>
				<span v-else>
					<svg
						class="w-7 h-7 text-emerald-700 dark:text-blue-100"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</span>
			</button>

			<!-- Menu (desktop) -->
			<nav class="hidden md:flex gap-2 ml-auto items-center">
				<NuxtLink
					to="/"
					class="px-4 py-2 rounded-xl font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm transition hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white">
					Home
				</NuxtLink>
				<NuxtLink
					v-if="!user"
					to="/login"
					class="px-4 py-2 rounded-xl font-semibold bg-blue-50 text-blue-800 border border-blue-200 shadow-sm transition hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white">
					Login
				</NuxtLink>
				<NuxtLink
					v-if="!user"
					to="/register"
					class="px-4 py-2 rounded-xl font-semibold bg-yellow-50 text-yellow-900 border border-yellow-200 shadow-sm transition hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-slate-900">
					Register
				</NuxtLink>
				<NuxtLink
					v-if="user"
					to="/dashboard"
					class="px-4 py-2 rounded-xl font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-sm transition hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white">
					Dashboard
				</NuxtLink>
				<button
					v-if="user"
					@click="logout"
					class="px-4 py-2 rounded-xl font-semibold bg-red-50 text-red-700 border border-red-200 shadow-sm transition hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white">
					Logout
				</button>
			</nav>
		</div>
		<!-- Mobile menu -->
		<transition name="fade">
			<nav
				v-if="open"
				class="md:hidden bg-white/95 dark:bg-slate-900/95 px-6 pt-2 pb-6 shadow-2xl border-t border-emerald-100 dark:border-slate-700">
				<div class="flex flex-col gap-2">
					<NuxtLink
						to="/"
						class="px-4 py-2 rounded-xl font-semibold text-center bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm transition hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white"
						@click="closeMenu">
						Home
					</NuxtLink>
					<NuxtLink
						v-if="!user"
						to="/login"
						class="px-4 py-2 rounded-xl font-semibold bg-blue-50 text-blue-800 border border-blue-200 shadow-sm transition hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white"
						@click="closeMenu">
						Login
					</NuxtLink>
					<NuxtLink
						v-if="!user"
						to="/register"
						class="px-4 py-2 rounded-xl font-semibold bg-yellow-50 text-yellow-900 border border-yellow-200 shadow-sm transition hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-slate-900"
						@click="closeMenu">
						Register
					</NuxtLink>
					<NuxtLink
						v-if="user"
						to="/dashboard"
						class="px-4 py-2 rounded-xl font-semibold text-center bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-sm transition hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white"
						@click="closeMenu">
						Dashboard
					</NuxtLink>
					<button
						v-if="user"
						@click="handleLogout"
						class="px-4 py-2 rounded-xl font-semibold bg-red-50 text-red-700 border border-red-200 shadow-sm transition hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white">
						Logout
					</button>
				</div>
			</nav>
		</transition>
	</header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
const { user, logout, loadFromStorage } = useAuth()
onMounted(loadFromStorage)

const open = ref(false)
function closeMenu() {
	open.value = false
}
function handleLogout() {
	logout()
	closeMenu()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
