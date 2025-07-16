<template>
	<h2 class="font-bold text-xl ml-1 text-white mt-14 mb-4">Airdrops</h2>
	<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
		<div v-for="airdrop in airdrops" :key="airdrop.title" class="card h-auto w-full bg-gray-800 rounded-2xl">
			<div class="relative h-30 rounded-t-2xl overflow-hidden" :class="`bg-anim-${airdrop.ecosystem.toLowerCase()}`">
				<img :src="airdrop.ecosystemLogo" alt="" class="absolute top-2 right-2 w-20 z-10" />
			</div>
			<div class="content flex flex-col justify-between align-center p-4 h-auto">
				<div class="flex justify-between">
					<img :src="airdrop.ecosystemLogo" alt="" class="w-10 h-10 mb-2" />
					<div class="text-white font-bold mt-1">{{ airdrop.title }}</div>
				</div>
				<div class="flex justify-between gap-2 mt-6">
					<div class="flex items-center bg-white/10 text-white rounded-full px-3 py-1 text-xs font-semibold gap-1">
						<span class="uppercase text-white/70 tracking-wide">Participants:</span>
						{{ airdrop.participants }}
					</div>
					<div class="flex items-center bg-white/10 text-white rounded-full px-3 py-1 text-xs font-semibold gap-1">
						<span class="uppercase text-white/70 tracking-wide">Value:</span>
						{{ airdrop.value }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import arbitrum from '~/assets/icons/arbitrum-badge.svg'
import base from '~/assets/icons/base-badge.svg'
import optimism from '~/assets/icons/optimism-badge.svg'
import solana from '~/assets/icons/solana-badge.svg'

const airdrops = [
	{
		image:
			'https://oaidalleapiprodscus.blob.core.windows.net/private/org-0x5OCbQeo8wLpP3VvPyYq25w/user-8xk1jcgxQszwFK7FSUoYXFeq/img-vIGmQ3vQ2AiI6N0liD9bNwD2.png',
		ecosystem: 'Arbitrum',
		ecosystemLogo: arbitrum,
		title: 'Arbitrum Odyssey',
		subtitle: 'Collect badges & earn exclusive rewards!',
		participants: '11K',
		value: '100k',
	},
	{
		image: '/img/airdrop2.jpg',
		ecosystem: 'Base',
		ecosystemLogo: base,
		title: 'Base Bootcamp',
		subtitle: 'Learn, earn, and build on Base.',
		participants: '15K',
		value: '100k',
	},
	{
		image: '/img/airdrop3.jpg',
		ecosystem: 'Optimism',
		ecosystemLogo: optimism,
		title: 'Optimism Summer',
		subtitle: 'Complete tasks, grow your reputation.',
		participants: '19K',
		value: '100k',
	},
	{
		image: '/img/airdrop4.jpg',
		ecosystem: 'Solana',
		ecosystemLogo: solana,
		title: 'Solana Surge',
		subtitle: 'Explore the Solana ecosystem.',
		participants: '24K',
		value: '100k',
	},
]
</script>
<style scoped>
.bg-anim-arbitrum::before {
	content: '';
	position: absolute;
	inset: 0;
	z-index: 1;
	background: linear-gradient(120deg, #1542c6, #36a2e8, #1542c6 60%);
	background-size: 200% 200%;
	animation: arbitrumGradient 6s ease-in-out infinite;
	opacity: 0.85;
}
@keyframes arbitrumGradient {
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

/* Base: pulsujące kółka w niebieskich barwach */
.bg-anim-base::before {
	content: '';
	position: absolute;
	inset: 0;
	z-index: 1;
	background: radial-gradient(circle at 35% 45%, #0052ff 0, #e3eafe 65%, #fff0 80%),
		radial-gradient(circle at 80% 70%, #3b82f6 0, #e3eafe 55%, #fff0 70%);
	opacity: 0.7;
	animation: basePulse 3.5s ease-in-out infinite alternate;
}
@keyframes basePulse {
	0% {
		opacity: 0.45;
	}
	100% {
		opacity: 0.85;
	}
}

.bg-anim-optimism::before {
	content: '';
	position: absolute;
	inset: 0;
	z-index: 1;
	background: radial-gradient(circle at 30% 40%, #fc3a3a 0, #fff0 60%),
		radial-gradient(circle at 80% 60%, #fd7474 0, #fff0 70%);
	opacity: 0.7;
	animation: optimismPulse 3.5s ease-in-out infinite alternate;
}
@keyframes optimismPulse {
	0% {
		opacity: 0.5;
	}
	100% {
		opacity: 0.8;
	}
}

.bg-anim-solana::before {
	content: '';
	position: absolute;
	inset: 0;
	z-index: 1;
	background: linear-gradient(100deg, #19fb9b 30%, #9945ff 90%, #ffffff00 100%);
	filter: blur(12px) brightness(1.3);
	opacity: 0.7;
	animation: solanaShine 2.8s linear infinite alternate;
}
@keyframes solanaShine {
	0% {
		filter: blur(12px) brightness(1);
	}
	100% {
		filter: blur(22px) brightness(1.2);
	}
}

.relative.h-30 {
	height: 120px;
}
</style>
