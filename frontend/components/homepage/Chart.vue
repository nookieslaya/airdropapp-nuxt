<template>
	<h2 class="font-bold text-xl ml-1 text-white mb-4 mt-14">Stats</h2>
	<section class="w-full mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 my-12">
		<h2 class="text-2xl font-bold text-white mb-8">Airdrop Users</h2>
		<Bar :data="data" :options="options" class="h-[340px] !bg-transparent" />
	</section>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js'

// rejestrujemy komponenty chartjs (tylko raz na app)
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const airdropStats = [
	{ name: 'Arbitrum', participants: 11000 },
	{ name: 'Base', participants: 15000 },
	{ name: 'Optimism', participants: 19000 },
	{ name: 'Solana', participants: 24000 },
]

const data = {
	labels: airdropStats.map(item => item.name),
	datasets: [
		{
			label: 'Participants',
			data: airdropStats.map(item => item.participants),
			backgroundColor: [
				'rgba(16,185,129,0.8)', // emerald
				'rgba(59,130,246,0.8)', // blue
				'rgba(236,72,153,0.8)', // pink/fuchsia
				'rgba(139,92,246,0.8)', // violet
			],
			borderRadius: 10,
			borderSkipped: false,
			maxBarThickness: 56,
		},
	],
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
		tooltip: {
			enabled: true,
			backgroundColor: '#232531',
			titleColor: '#fff',
			bodyColor: '#fff',
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
			ticks: {
				color: '#fff',
				font: { weight: 'bold' as const },
			},
		},
		y: {
			grid: {
				color: 'rgba(255,255,255,0.09)',
			},
			ticks: {
				color: '#fff',
				stepSize: 5000,
			},
		},
	},
}
</script>
