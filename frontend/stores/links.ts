import { defineStore } from 'pinia'
import { API_BASE } from '~/lib/api'

export interface AdditionalLink {
	url: string
	description?: string
}
export interface LinkItem {
	id: number
	title: string
	url: string
	type: string
	status?: 'new' | 'pending' | 'claimed'
	note?: string
	date?: string
	additional_links?: AdditionalLink[]
}

function parseAdditionalLinks(val: any): AdditionalLink[] {
	if (!val) return []
	if (Array.isArray(val)) return val
	try {
		const parsed = JSON.parse(val)
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

export const useLinkStore = defineStore('links', {
	state: () => ({
		links: [] as LinkItem[],
		loading: false,
		error: '' as string,
	}),
	actions: {
		async fetchLinks() {
			this.loading = true
			this.error = ''
			try {
				const res = await fetch(`${API_BASE}/links`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				if (!res.ok) throw new Error(await res.text())
				const data = await res.json()
				this.links = data.map((link: any) => ({
					...link,
					additional_links: parseAdditionalLinks(link.additional_links),
				}))
			} catch (e: any) {
				this.error = e.message || 'Nie udało się pobrać linków'
			} finally {
				this.loading = false
			}
		},
		async addLink(link: { title: string; url: string; type: string; additional_links?: AdditionalLink[] }) {
			this.loading = true
			this.error = ''
			try {
				// Przygotuj payload osobno
				const payload: any = { ...link }
				if (payload.additional_links) {
					payload.additional_links = JSON.stringify(payload.additional_links)
				}
				const res = await fetch(`${API_BASE}/links`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify(payload),
				})

				if (!res.ok) throw new Error(await res.text())
				await this.fetchLinks()
			} catch (e: any) {
				this.error = e.message || 'Błąd przy dodawaniu linku'
			} finally {
				this.loading = false
			}
		},
		async updateLink(id: number, link: Partial<LinkItem>) {
			this.loading = true
			this.error = ''
			try {
				const payload: any = { ...link }
				if (payload.additional_links) {
					payload.additional_links = JSON.stringify(payload.additional_links)
				}
				const res = await fetch(`${API_BASE}/links/${id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify(payload),
				})
				if (!res.ok) throw new Error(await res.text())
				await this.fetchLinks()
			} catch (e: any) {
				this.error = e.message || 'Błąd przy aktualizacji linku'
			} finally {
				this.loading = false
			}
		},
		async deleteLink(id: number) {
			this.loading = true
			this.error = ''
			try {
				const res = await fetch(`${API_BASE}/links/${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				if (!res.ok) throw new Error(await res.text())
				await this.fetchLinks()
			} catch (e: any) {
				this.error = e.message || 'Nie udało się usunąć linku'
			} finally {
				this.loading = false
			}
		},
	},
})
