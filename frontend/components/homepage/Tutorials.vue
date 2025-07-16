<template>
	<section class="mt-16">
		<h2 class="font-bold text-xl ml-1 text-white mb-4">Tutorials</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div
				v-for="tutorial in tutorials"
				:key="tutorial.title"
				class="group relative bg-gradient-to-tr from-gray-700/80 to-indigo-700/90 rounded-2xl shadow-xl min-h-[180px] flex flex-col justify-between p-5 transition hover:scale-[1.01] hover:shadow-2xl duration-200 overflow-visible">
				<!-- Logo ponad kafelkiem, nie jest obcinane -->
				<div class="absolute right-5 top-4 z-20">
					<img
						:src="tutorial.logo"
						class="w-40 p-1 h-40 opacity-20 rounded-full shadow-xl group-hover:scale-110 transition"
						alt="" />
				</div>
				<!-- Animowane tło -->
				<div
					class="absolute inset-0 z-1 animate-tutorial-bg bg-gradient-to-tr from-blue-400/30 via-fuchsia-400/10 to-white/5 pointer-events-none" />
				<!-- Treść -->
				<div class="relative z-10 mt-12 rounded-2xl">
					<div class="font-bold text-white text-lg mb-1 flex items-center gap-2">
						{{ tutorial.title }}
						<span
							v-if="tutorial.label"
							class="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/10 text-fuchsia-200 uppercase tracking-wide font-semibold"
							>{{ tutorial.label }}</span
						>
					</div>
					<div class="text-slate-200 text-sm mt-1 mb-2 max-w-[400px] rounded-2xl">{{ tutorial.desc }}</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import arbitrum from '~/assets/icons/arbitrum-badge.svg'
import base from '~/assets/icons/base-badge.svg'
import optimism from '~/assets/icons/optimism-badge.svg'
import solana from '~/assets/icons/solana-badge.svg'

const tutorials = [
	{
		logo: arbitrum,
		title: 'Arbitrum Odyssey',
		desc: 'How to get started with the Arbitrum bridge? A quick step-by-step guide and FAQ.',
		label: 'easy',
	},
	{
		logo: base,
		title: 'Base Bootcamp',
		desc: 'The first airdrop on Base – what to do to make sure you don’t miss any task.',
		label: 'video',
	},
	{
		logo: optimism,
		title: 'Optimism Summer',
		desc: 'Strategies for quickly earning points in the Optimism Quest.',
		label: '',
	},
	{
		logo: solana,
		title: 'Solana Surge',
		desc: 'How to join the Solana airdrop, step by step with a checklist.',
		label: '',
	},
]
</script>

<style scoped>
@keyframes tutorial-bg {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
.animate-tutorial-bg {
	background-size: 200% 200%;
	border-radius: px;
	animation: tutorial-bg 6s ease-in-out infinite;
}
</style>
