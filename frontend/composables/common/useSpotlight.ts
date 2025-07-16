// composables/useSpotlight.ts
import { ref } from 'vue'

export function useSpotlight() {
	const spotlight = ref({
		x: 0,
		y: 0,
		active: false,
	})

	function onMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement
		const rect = target.getBoundingClientRect()
		spotlight.value.x = e.clientX - rect.left
		spotlight.value.y = e.clientY - rect.top
		spotlight.value.active = true
	}
	function onMouseLeave() {
		spotlight.value.active = false
	}

	return { spotlight, onMouseMove, onMouseLeave }
}
