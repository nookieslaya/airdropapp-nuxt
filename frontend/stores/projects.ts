import { defineStore } from 'pinia'
import { API_BASE } from '~/lib/api'

export interface Project {
	id: number
	name: string
	image: string
	description: string
	link: string
	extra_info: string
}

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		projects: [] as Project[],
		loading: false,
		error: '',
		success: '',
	}),
	actions: {
		async fetchProjects() {
			this.loading = true
			this.error = ''
			try {
				const result = await $fetch<Project[]>(`${API_BASE}/projects`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				this.projects = Array.isArray(result) ? result : []
			} catch (e: any) {
				this.error = e.message || 'Błąd pobierania projektów.'
			} finally {
				this.loading = false
			}
		},
		async addProject(project: Omit<Project, 'id'>) {
			;(this.loading = true), (this.error = ''), (this.success = '')
			try {
				const res = await fetch(`${API_BASE}/projects`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify(project),
				})
				if (!res.ok) throw new Error(await res.text())
				await this.fetchProjects() // odśwież po dodaniu!
				this.success = 'Projekt został dodany!'
			} catch (e: any) {
				this.error = e.message || 'Nie udało się dodać projektu.'
			} finally {
				this.loading = false
			}
		},
		async deleteProject(id: number) {
			this.loading = true
			this.error = ''
			this.success = ''
			try {
				const res = await fetch(`${API_BASE}/projects/${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				if (!res.ok) throw new Error(await res.text())
				await this.fetchProjects()
				this.success = 'Projekt został usunięty!'
			} catch (e: any) {
				this.error = e.message || 'Nie udało się usunąć projektu.'
			} finally {
				this.loading = false
			}
		},
	},
})
