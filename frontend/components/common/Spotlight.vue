<!-- components/SpotlightText.vue -->
<template>
	<span class="inline-flex flex-wrap">
		<span
			v-for="(letter, i) in letters"
			:key="i"
			ref="el => letterRefs[i] = el"
			class="transition-colors duration-200"
			:style="{
				color: isLit(i) ? color : '',
				textShadow: isLit(i) ? '0 2px 12px ' + shadow : '',
			}"
			>{{ letter === ' ' ? '\u00A0' : letter }}</span
		>
	</span>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'

const props = defineProps<{
	text: string
	spotlight: { x: number; y: number; active: boolean }
	radius?: number
	color?: string
	shadow?: string
}>()

const letters = props.text.split('')
const letterRefs = ref<HTMLElement[]>([])

function isLit(i: number) {
	if (!props.spotlight.active || !letterRefs.value[i]) return false
	const span = letterRefs.value[i]
	const rect = span.getBoundingClientRect()
	const centerX = rect.left + rect.width / 2 + window.scrollX
	const centerY = rect.top + rect.height / 2 + window.scrollY
	const targetX = props.spotlight.x + window.scrollX
	const targetY = props.spotlight.y + window.scrollY
	const dist = Math.sqrt(Math.pow(centerX - targetX, 2) + Math.pow(centerY - targetY, 2))
	return dist < (props.radius ?? 90)
}

watch(
	() => props.text,
	() => nextTick()
)
onMounted(() => nextTick())
</script>
