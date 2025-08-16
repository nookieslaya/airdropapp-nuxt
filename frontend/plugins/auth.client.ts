// plugins/auth.client.ts
export default defineNuxtPlugin(() => {
	const { loadFromStorage } = useAuth()
	loadFromStorage()
})
