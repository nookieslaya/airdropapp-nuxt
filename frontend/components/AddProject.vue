<template>
	<UCard
		class="max-w-2xl mx-auto bg-white/5 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-lg p-0 overflow-hidden">
		<template #header>
			<h2 class="font-bold text-2xl text-white tracking-wide px-6 pt-6 pb-2">Dodaj nowy projekt</h2>
		</template>
		<form @submit.prevent="submitProject" class="flex flex-col gap-4 px-6 pb-8">
			<UInput
				v-model="name"
				placeholder="Nazwa projektu"
				class="!bg-black/70 !text-white !border-white/20"
				input-class="!text-white" />
			<UInput
				v-model="image"
				placeholder="URL obrazka"
				class="!bg-black/70 !text-white !border-white/20"
				input-class="!text-white" />
			<UTextarea
				v-model="description"
				placeholder="Opis projektu"
				class="!bg-black/70 !text-white !border-white/20"
				input-class="!text-white"
				autoresize
				:rows="3" />
			<UInput
				v-model="link"
				placeholder="Link do strony (https://...)"
				class="!bg-black/70 !text-white !border-white/20"
				input-class="!text-white" />
			<UInput
				v-model="extra_info"
				placeholder="Dodatkowe informacje (opcjonalnie)"
				class="!bg-black/70 !text-white !border-white/20"
				input-class="!text-white" />
			<UButton
				type="submit"
				:loading="loading"
				:block="true"
				class="rounded-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-500 transition text-white mt-2 shadow">
				Dodaj projekt
			</UButton>
		</form>
	</UCard>
</template>

<script lang="ts" setup>
const projectsStore = useProjectsStore()
const toast = useToast()

const name = ref('')
const image = ref('')
const description = ref('')
const link = ref('')
const extra_info = ref('')

const loading = ref(false)

const submitProject = async () => {
	projectsStore.error = ''
	projectsStore.success = ''
	if (!name.value || !image.value) {
		toast.add({
			title: 'Błąd',
			description: 'Wypełnij wszystkie pola',
			color: 'error',
		})
		return
	}
	loading.value = true
	await projectsStore.addProject({
		name: name.value,
		image: image.value,
		description: description.value,
		link: link.value,
		extra_info: extra_info.value,
	})
	loading.value = false
}
</script>
