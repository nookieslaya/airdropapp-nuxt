import { ref } from 'vue'

const user = ref<any>(null)
const token = ref<string | null>(null)

export function useAuth() {
	const router = useRouter()

	function setUser(u: any, t: string) {
		user.value = u
		token.value = t
		if (process.client) {
			localStorage.setItem('token', t)
			localStorage.setItem('user', JSON.stringify(u))
		}
	}

	function logout() {
		user.value = null
		token.value = null
		if (process.client) {
			localStorage.removeItem('token')
			localStorage.removeItem('user')
		}
		router.push('/login')
	}

	function loadFromStorage() {
		if (!process.client) return
		const t = localStorage.getItem('token')
		const u = localStorage.getItem('user')
		if (t && u) {
			token.value = t
			try {
				user.value = JSON.parse(u)
			} catch {
				user.value = null
			}
		}
	}

	return { user, token, setUser, logout, loadFromStorage }
}
