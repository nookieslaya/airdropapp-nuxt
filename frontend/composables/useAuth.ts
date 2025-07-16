import { ref } from 'vue'

const user = ref<any>(null)
const token = ref<string | null>(process.client ? localStorage.getItem('token') : null)
export function useAuth() {
	const router = useRouter()
	function setUser(u: any, t: string) {
		user.value = u
		token.value = t
		localStorage.setItem('token', t)
		localStorage.setItem('user', JSON.stringify(u))
	}
	function logout() {
		user.value = null
		token.value = null
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		router.push('/login')
	}
	function loadFromStorage() {
		if (process.client) {
			const t = localStorage.getItem('token')
			const u = localStorage.getItem('user')
			if (t && u) {
				token.value = t
				user.value = JSON.parse(u)
			}
		}
	}
	return { user, token, setUser, logout, loadFromStorage }
}
