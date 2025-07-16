<template>
	<section class="relative flex items-center justify-center w-full overflow-hidden">
		<!-- subtelny szary glow za kontenerem -->
		<div class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
			<div class="w-[520px] h-[250px] bg-white/5 blur-2xl rounded-full"></div>
		</div>
		<div
			class="relative z-20 mt-10 flex gap-8 flex-col md:flex-row items-center w-full justify-between mx-auto p-8 md:p-16 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
			<div class="flex-1 flex flex-col justify-center items-start mb-8 md:mb-0">
				<h1 class="text-5xl mb-8 font-bold tracking-tight text-emerald-600 select-none">
					airdrop<span class="text-blue-500">app</span>
				</h1>

				<p class="mb-4 text-lg text-white/80">
					makes crypto fun, rewarding, and alive. Join and earn exclusive rewards!
				</p>
				<NuxtLink
					to="/project/1"
					class="flex items-center gap-2 px-8 py-3 mt-6 rounded-full text-white font-semibold shadow-lg transition-all bg-black/80 border border-white/20 text-lg active:scale-95 hover:bg-black/70">
					🚀 Join now!
				</NuxtLink>
			</div>
			<div class="flex-shrink-0 flex items-center justify-center w-full md:w-auto relative">
				<!-- delikatny szary glow pod obrazkiem -->
				<div
					class="absolute z-0 w-60 h-60 md:w-80 md:h-80 bg-white/10 blur-2xl rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
				<img
					:src="layerImg"
					class="relative z-10 w-52 h-52 md:w-72 md:h-72 object-contain rounded-2xl shadow-2xl border-2 border-white/10"
					alt="Layer3" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import layerImg from '~/assets/icons/layer.webp'
</script>
