<template>
	<footer class="w-full mt-10 border-t border-white/10 bg-white/5 backdrop-blur-md rounded-2xl">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 py-8 px-4">
			<div class="flex items-center gap-3">
				<!-- <img src="/logo.svg" alt="Logo" class="w-8 h-8" /> -->
				<span class="text-2xl font-bold tracking-tight text-emerald-600 select-none">
					airdrop<span class="text-blue-500">app</span>
				</span>
			</div>
			<div class="flex gap-6 mt-2 md:mt-0">
				<NuxtLink to="/" class="text-white/70 hover:text-white transition text-sm">Home</NuxtLink>
				<NuxtLink to="/dashboard" class="text-white/70 hover:text-white transition text-sm">Dashboard</NuxtLink>
				<NuxtLink to="/" class="text-white/70 hover:text-white transition text-sm">Tutorials</NuxtLink>
				<a
					href="https://twitter.com/..."
					target="_blank"
					class="text-white/70 hover:text-fuchsia-400 transition text-sm"
					>X</a
				>
			</div>
			<!-- Copyright -->
			<div class="text-xs text-white/50 mt-2 md:mt-0">© {{ new Date().getFullYear() }} All rights reserved</div>
		</div>
	</footer>
</template>
