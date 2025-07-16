<template>
	<section>
		<div class="flex justify-between items-center mb-4 max-w-[1280px] mx-auto w-full mt-10">
			<h2 class="font-bold text-xl ml-1 text-white">Ecosystems</h2>
			<div class="flex items-center gap-2">
				<button
					@click="slidePrev"
					:disabled="swiperRef?.isBeginning"
					class="rounded-full bg-gray-800 w-8 h-8 flex items-center justify-center text-white text-lg transition hover:bg-gray-700 disabled:opacity-50">
					<span>&lt;</span>
				</button>
				<button
					@click="slideNext"
					:disabled="swiperRef?.isEnd"
					class="rounded-full bg-gray-800 w-8 h-8 flex items-center justify-center text-white text-lg transition hover:bg-gray-700 disabled:opacity-50">
					<span>&gt;</span>
				</button>
			</div>
		</div>
		<div class="max-w-[1280px] mx-auto w-full overflow-hidden">
			<Swiper
				:breakpoints="{
					0: { slidesPerView: 2, spaceBetween: 8 },
					480: { slidesPerView: 3, spaceBetween: 12 },
					768: { slidesPerView: 4, spaceBetween: 14 },
					1024: { slidesPerView: 10, spaceBetween: 18 },
				}"
				@swiper="onSwiper"
				class="w-full">
				<SwiperSlide v-for="(airdrop, idx) in airdrops" :key="idx" class="!flex !justify-center">
					<div
						class="group h-20 w-20 p-2 rounded-2xl bg-white/40 border border-gray-800 flex items-center justify-center transition-shadow duration-300 hover:shadow-lg">
						<img
							:src="airdrop"
							class="w-14 h-14 object-contain transition-transform duration-300 group-hover:-translate-y-1"
							draggable="false" />
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import arbitrum from '~/assets/icons/arbitrum-badge.svg'
import base from '~/assets/icons/base-badge.svg'
import bob from '~/assets/icons/bob-badge.svg'
import ethereum from '~/assets/icons/ethereum-badge.svg'
import linea from '~/assets/icons/linea-badge.svg'
import optimism from '~/assets/icons/optimism-badge.svg'
import solana from '~/assets/icons/solana-badge.svg'
import zksync from '~/assets/icons/zksync-badge.svg'

const airdrops = [
	arbitrum,
	base,
	bob,
	base,
	ethereum,
	linea,
	optimism,
	solana,
	zksync,
	base,
	ethereum,
	linea,
	optimism,
	solana,
	zksync,
]

const swiperRef = ref<any>(null)

function onSwiper(swiper: any) {
	swiperRef.value = swiper
}

function slidePrev() {
	swiperRef.value?.slidePrev()
}
function slideNext() {
	swiperRef.value?.slideNext()
}
</script>
