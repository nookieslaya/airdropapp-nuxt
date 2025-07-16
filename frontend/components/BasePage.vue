<template>
	<div class="container m-auto">
		<div class="relative min-h-screen">
			<div class="relative z-10 flex flex-col items-center py-12 px-4 max-w-[1440px] mx-auto">
				<h1 class="text-3xl md:text-4xl font-bold mb-2 text-blue-900 dark:text-blue-100 text-center">
					{{ title }}
				</h1>
				<p v-if="description" class="mb-8 text-gray-600 dark:text-blue-200 text-center">
					{{ description }}
				</p>
				<div class="w-full">
					<slot />
				</div>
			</div>
		</div>
	</div>
	<HomepageFooter />
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

defineProps<{
	title?: string
	description?: string
}>()
</script>
