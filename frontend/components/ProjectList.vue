<template>
	<div class="flex flex-col gap-8 w-full mx-auto">
		<div class="flex justify-center">
			<AddProject />
		</div>
		<div class="flex flex-col items-center w-full">
			<div v-if="projectsStore.loading" class="flex flex-col gap-2 w-full max-w-md">
				<USkeleton class="w-full h-10 rounded-xl" v-for="i in 2" :key="i" />
			</div>
			<UAlert v-if="projectsStore.error" color="error" :description="projectsStore.error" class="mb-4" />
			<div v-else>
				<div v-if="projectsStore.projects.length" class="grid grid-cols-2 gap-5 w-full">
					<UCard
						v-for="project in projectsStore.projects"
						:key="project.id"
						class="flex flex-col items-center h-full bg-white/5 border border-white/10 shadow-xl rounded-3xl backdrop-blur-lg transition hover:shadow-2xl hover:border-emerald-400/20 p-0 overflow-hidden group">
						<div class="w-full relative">
							<img
								:src="project.image"
								:alt="project.name"
								class="w-full h-40 object-cover rounded-t-3xl transition group-hover:scale-105 duration-200" />
							<UButton
								color="error"
								variant="solid"
								class="absolute top-3 right-3 px-3 py-1.5 text-xs rounded-full shadow-md"
								@click="removeProject(project.id)"
								:loading="projectsStore.loading">
								Usuń
							</UButton>
						</div>
						<div class="px-5 pt-3 pb-4 w-full flex flex-col items-center">
							<h3 class="text-lg font-bold text-white text-center truncate w-full">{{ project.name }}</h3>
							<p class="text-sm text-white/70 mt-2 text-center break-words">{{ project.description }}</p>
							<p class="text-xs text-emerald-400 mt-2 text-center break-words" v-if="project.extra_info">
								{{ project.extra_info }}
							</p>
							<a
								v-if="project.link"
								:href="project.link"
								target="_blank"
								rel="noopener"
								class="mt-3 text-blue-400 underline text-xs hover:text-emerald-400 transition">
								Zobacz stronę
							</a>
						</div>
					</UCard>
				</div>
				<UAlert v-else title="Brak projektów" class="mt-8" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects'
const projectsStore = useProjectsStore()

function removeProject(id: number) {
	if (confirm('Na pewno usunąć ten projekt?')) {
		projectsStore.deleteProject(id)
	}
}

onMounted(() => {
	projectsStore.fetchProjects()
})
</script>
