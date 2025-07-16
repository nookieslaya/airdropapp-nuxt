// /composables/useCoingecko.ts
import { ref } from 'vue'

export function useCoingecko() {
	const coins = ref<any[]>([])
	const error = ref<string | null>(null)
	const loading = ref(false)

	async function fetchCoins({ ids, vsCurrency = 'usd' }: { ids: string[]; vsCurrency?: string }) {
		loading.value = true
		error.value = null
		coins.value = []
		try {
			const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${ids.join(',')}`
			const res = await fetch(url)
			const data = await res.json()
			coins.value = data
			if (!coins.value.length) error.value = 'Brak danych'
		} catch (e: any) {
			error.value = e.message || 'Błąd pobierania danych'
		} finally {
			loading.value = false
		}
	}

	async function fetchTopCoins({ vsCurrency = 'usd', perPage = 10 }: { vsCurrency?: string; perPage?: number }) {
		loading.value = true
		error.value = null
		coins.value = []
		try {
			const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${perPage}&page=1`
			const res = await fetch(url)
			const data = await res.json()
			coins.value = data
			if (!coins.value.length) error.value = 'Brak danych'
		} catch (e: any) {
			error.value = e.message || 'Błąd pobierania danych'
		} finally {
			loading.value = false
		}
	}

	return { coins, error, loading, fetchCoins, fetchTopCoins }
}
