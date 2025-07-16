<template>
	<div v-if="loading" class="p-4 text-center">Ładowanie...</div>
	<div v-else-if="error" class="p-4 text-red-600">Błąd: {{ error }}</div>
	<div
		v-else
		class="relative w-full overflow-x-hidden bg-white/80 dark:bg-gray-900/90 border-y border-gray-200 dark:border-gray-800">
		<div
			class="flex gap-8 py-2 animate-ticker whitespace-nowrap min-w-max"
			:style="{ animationDuration: coins.length * 4 + 's' }">
			<div v-for="coin in coins" :key="coin.id" class="flex items-center gap-3 min-w-[180px] px-3">
				<img :src="coin.image" :alt="coin.name" class="w-6 h-6 rounded-full" />
				<div class="font-semibold text-base">{{ coin.symbol.toUpperCase() }}</div>
				<div class="font-mono text-base">{{ coin.current_price }} {{ currencyLabel }}</div>
				<div
					:class="coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-500'"
					class="font-mono text-sm">
					{{ coin.price_change_percentage_24h > 0 ? '+' : '' }}{{ coin.price_change_percentage_24h?.toFixed(2) }}%
				</div>
			</div>
			<!-- Klonujemy listę, by ticker był płynny -->
			<template v-for="coin in coins" :key="'clone-' + coin.id">
				<div class="flex items-center gap-3 min-w-[180px] px-3">
					<img :src="coin.image" :alt="coin.name" class="w-6 h-6 rounded-full" />
					<div class="font-semibold text-base">{{ coin.symbol.toUpperCase() }}</div>
					<div class="font-mono text-base">{{ coin.current_price }} {{ currencyLabel }}</div>
					<div
						:class="coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-500'"
						class="font-mono text-sm">
						{{ coin.price_change_percentage_24h > 0 ? '+' : '' }}{{ coin.price_change_percentage_24h?.toFixed(2) }}%
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCoingecko } from '@/composables/common/useCoingecko'
import { ref } from 'vue'

const { coins, error, loading, fetchTopCoins } = useCoingecko()
const currency = ref('usd')
fetchTopCoins({ vsCurrency: currency.value, perPage: 20 })

const currencyLabel = computed(() => currency.value.toUpperCase())
</script>

<style scoped>
@keyframes ticker {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}
.animate-ticker {
	animation: ticker linear infinite;
}
</style>
