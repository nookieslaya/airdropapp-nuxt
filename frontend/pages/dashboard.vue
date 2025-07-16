<template>
	<BasePage>
		<div class="flex flex-col md:flex-row w-full">
			<LinkManager />
			<!-- <ProjectList /> -->
		</div>
	</BasePage>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
const { user, loadFromStorage } = useAuth()
const router = useRouter()
onMounted(() => {
	loadFromStorage()
	if (!user.value) {
		router.push('/login')
	}
})
</script>
