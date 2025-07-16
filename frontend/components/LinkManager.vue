<template>
	<UCard
		class="max-w-3xl w-full mx-auto bg-white/5 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-lg p-0 overflow-hidden">
		<template #header>
			<h2 class="font-bold text-2xl text-white tracking-wide px-6 pt-6 pb-2">My Links (Airdrops)</h2>
		</template>

		<!-- Add new link form -->
		<form @submit.prevent="editingId ? updateLink() : addLink()" class="flex flex-col gap-3 mb-8 px-6">
			<UInput
				v-model="title"
				placeholder="Link title"
				class="!bg-black/70 !text-white !border-white/20"
				input-class="!text-white" />
			<UInput
				v-model="url"
				placeholder="URL (e.g. https://...)"
				class="!bg-black/70 !text-white !border-white/20"
				input-class="!text-white" />
			<USelect
				v-model="type"
				:items="typeOptions"
				placeholder="Link type"
				class="!bg-black/70 !text-white !border-white/20" />
			<UButton
				type="submit"
				:loading="linkStore.loading"
				:block="true"
				class="rounded-full font-semibold tracking-wide bg-emerald-600 hover:bg-emerald-500 transition text-white mt-2">
				{{ editingId ? 'Update' : linkStore.loading ? 'Adding...' : 'Add link' }}
			</UButton>
			<UButton
				v-if="editingId"
				type="button"
				color="info"
				variant="outline"
				class="rounded-full font-semibold tracking-wide border border-fuchsia-500/50 text-fuchsia-400 bg-white/5 hover:bg-fuchsia-800/20 transition"
				@click="cancelEdit"
				:block="true">
				Cancel
			</UButton>
			<UAlert v-if="linkStore.error" color="error" class="mt-2" :description="linkStore.error" />
		</form>

		<!-- Filtering and sorting -->
		<div class="flex flex-wrap gap-2 mb-6 px-6 items-end">
			<USelectMenu
				v-model="sortBy"
				:items="sortOptions"
				value-key="value"
				label-key="label"
				placeholder="Sort by"
				class="w-44" />
			<USelectMenu
				v-model="filterType"
				:items="[{ label: 'All', value: 'all' }, ...typeOptions]"
				value-key="value"
				label-key="label"
				placeholder="Filter type"
				class="w-44" />
			<UButton
				v-if="filterType !== 'all'"
				variant="ghost"
				size="sm"
				icon="i-heroicons-x-mark"
				@click="filterType = 'all'"
				class="text-emerald-400 border border-emerald-500/20 hover:bg-emerald-900/10 -ml-2">
				Clear
			</UButton>
		</div>

		<!-- Links list -->
		<div v-if="linkStore.loading" class="px-6">
			<USkeleton class="h-10 w-full mb-2 rounded-xl" v-for="i in 4" :key="i" />
		</div>
		<div v-else-if="linkStore.links.length" class="px-2 pb-2">
			<ul class="space-y-3">
				<li
					v-for="link in sortedLinks"
					:key="link.id"
					:class="[
						'flex flex-col gap-2 px-5 py-3 rounded-2xl shadow transition hover:scale-[1.01] hover:shadow-xl',
						getBgClass(link),
					]">
					<div class="flex justify-between items-center">
						<div class="relative w-full min-h-[70px] flex flex-col justify-center">
							<div class="font-semibold text-white text-sm relative z-10">{{ link.title }}</div>
							<a
								:href="formatUrl(link.url)"
								target="_blank"
								rel="noopener"
								class="text-xs text-blue-400 underline break-all hover:text-emerald-400 transition relative z-10">
								{{ link.url }}
							</a>
							<!-- Display additional links -->
							<div
								v-if="link.additional_links && Array.isArray(link.additional_links) && link.additional_links.length"
								class="text-xs text-white/80 mt-2">
								<div
									v-for="(add, idx) in link.additional_links"
									:key="idx"
									class="mb-1 flex gap-1 sm:items-center flex-col sm:flex-row gap-y-2">
									<span class="font-bold text-emerald-300">Additional link:</span>
									<a
										:href="formatUrl(add.url)"
										target="_blank"
										rel="noopener"
										class="underline text-blue-300 break-all"
										>{{ add.url }}</a
									>
									<span v-if="add.description" class="ml-1 italic text-white/60">({{ add.description }})</span>
								</div>
							</div>
							<!-- Note -->
							<div v-if="link.note" class="text-xs italic text-white/70 mt-1">
								{{ link.note }}
							</div>
							<!-- Only for AIRDROP: status + date -->
							<div v-if="link.type === 'airdrop'" class="flex flex-wrap gap-3 mt-1 text-xs">
								<div class="text-white/70">
									Status:
									<span v-if="link.status === 'new'" class="text-blue-400 font-bold">New</span>
									<span v-else-if="link.status === 'pending'" class="text-emerald-400 font-bold">Pending</span>
									<span v-else-if="link.status === 'claimed'" class="text-orange-400 font-bold">Claimed</span>
								</div>
								<div v-if="link.date" class="text-white/50">Date: {{ formatDate(link.date) }}</div>
							</div>
							<span
								class="absolute inset-0 flex items-start justify-center pointer-events-none select-none z-0"
								aria-hidden="true">
								<span
									class="text-3xl md:text-3xl ml-70 font-black uppercase text-white drop-shadow-xl opacity-10 tracking-widest blur-[2px] hover:scale-101 transition duration-500 ease-in-out mix-blend-overlay">
									{{ getTypeLabel(link.type) }}
								</span>
							</span>
						</div>
						<div class="flex gap-2 items-center ml-4">
							<UButton
								:icon="expandedId === link.id ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
								size="xs"
								color="primary"
								variant="ghost"
								@click="toggleExpand(link)"
								:aria-label="expandedId === link.id ? 'Hide details' : 'Show details'" />
							<UButton
								icon="i-heroicons-pencil"
								size="xs"
								color="info"
								class="rounded-full border border-emerald-600/60 text-emerald-400 bg-emerald-800/20 hover:bg-emerald-800/40"
								variant="soft"
								@click="startEdit(link)"
								:disabled="editingId === link.id"
								:aria-label="`Edit ${link.title}`" />
							<UButton
								icon="i-heroicons-trash"
								size="xs"
								color="info"
								class="rounded-full border border-fuchsia-500/60 text-fuchsia-400 bg-fuchsia-800/10 hover:bg-fuchsia-800/30"
								variant="soft"
								@click="deleteLink(link.id)"
								:disabled="editingId === link.id"
								:aria-label="`Delete ${link.title}`" />
						</div>
					</div>

					<!-- Details (inline edit) -->
					<transition name="fade">
						<div
							v-if="expandedId === link.id"
							class="bg-white/10 rounded-xl mt-2 p-4 text-white text-sm flex flex-col gap-3 border border-emerald-600/10">
							<!-- For airdrop: status/date/note + additional links -->
							<template v-if="link.type === 'airdrop'">
								<label class="flex flex-col gap-1">
									<span class="font-semibold">Status:</span>
									<USelectMenu
										v-model="editStatus"
										:items="statusOptions"
										value-key="value"
										label-key="label"
										class="w-40" />
								</label>
								<label class="flex flex-col gap-1">
									<span class="font-semibold">Note:</span>
									<UInput v-model="editNote" placeholder="Add note..." />
								</label>
								<label class="flex flex-col gap-1">
									<span class="font-semibold">Date:</span>
									<UInput v-model="editDate" type="date" class="w-40" />
								</label>
								<div class="mt-3">
									<span class="font-semibold block mb-2">Additional links:</span>
									<div v-for="(item, i) in editAdditionalLinks" :key="i" class="flex items-center gap-2 mb-2">
										<UInput v-model="item.url" placeholder="Additional link" class="flex-1" />
										<UInput v-model="item.description" placeholder="Description" class="flex-1" />
										<UButton icon="i-heroicons-trash" size="xs" color="warning" @click="removeAdditionalLink(i)" />
									</div>
									<UButton size="sm" variant="outline" class="mt-1" @click="addAdditionalLink">Add link</UButton>
								</div>
							</template>
							<!-- Other types: only note + additional links -->
							<template v-else>
								<label class="flex flex-col gap-1">
									<span class="font-semibold">Note:</span>
									<UInput v-model="editNote" placeholder="Add note..." />
								</label>
								<div class="mt-3">
									<span class="font-semibold block mb-2">Additional links:</span>
									<div v-for="(item, i) in editAdditionalLinks" :key="i" class="flex items-center gap-2 mb-2">
										<UInput v-model="item.url" placeholder="Additional link" class="flex-1" />
										<UInput v-model="item.description" placeholder="Description" class="flex-1" />
										<UButton icon="i-heroicons-trash" size="xs" color="warning" @click="removeAdditionalLink(i)" />
									</div>
									<UButton size="sm" variant="soft" class="mt-1" @click="addAdditionalLink">Add link</UButton>
								</div>
							</template>
							<div class="flex gap-2 mt-2">
								<UButton size="sm" color="success" @click="saveDetails(link)">Save</UButton>
								<UButton size="sm" variant="outline" @click="resetDetails(link)">Cancel</UButton>
							</div>
						</div>
					</transition>
				</li>
			</ul>
		</div>
		<p v-else class="text-white/50 text-center mt-2 pb-6">No links.</p>
	</UCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '#imports'
import { useLinkStore } from '~/stores/links'

const linkStore = useLinkStore()

const title = ref('')
const url = ref('')
const type = ref('strona')
const editingId = ref<number | null>(null)

const typeOptions = [
	{ label: 'Airdrop', value: 'airdrop' },
	{ label: 'Faucet', value: 'faucet' },
	{ label: 'Page', value: 'strona' },
	{ label: 'Exchange', value: 'exchange' },
	{ label: 'Social', value: 'social' },
	{ label: 'Testnet', value: 'testnet' },
	{ label: 'Other', value: 'inne' },
]

function getTypeLabel(type: string) {
	const option = typeOptions.find(opt => opt.value === type)
	return option ? option.label : type
}

const sortOptions = [
	{ label: 'Newest', value: 'date-desc' },
	{ label: 'Oldest', value: 'date-asc' },
	{ label: 'Name A-Z', value: 'name-asc' },
	{ label: 'Name Z-A', value: 'name-desc' },
	{ label: 'Type (A-Z)', value: 'type-asc' },
	{ label: 'Type (Z-A)', value: 'type-desc' },
]
const sortBy = ref('date-desc')
const filterType = ref('all')
const toast = useToast()

onMounted(linkStore.fetchLinks)

const addLink = async () => {
	if (!title.value || !url.value) {
		linkStore.error = 'Fill all inputs'
		return
	}
	await linkStore.addLink({ title: title.value, url: url.value, type: type.value })
	title.value = ''
	url.value = ''
	type.value = 'strona'
	toast.add({ title: 'Congrats!', description: 'You add new Link!', color: 'success' })
}

const updateLink = async () => {
	if (!title.value || !url.value) {
		linkStore.error = 'Uzupełnij wszystkie pola'
		return
	}
	await linkStore.updateLink(editingId.value!, { title: title.value, url: url.value, type: type.value })
	cancelEdit()
	toast.add({ title: 'Congrats!', description: 'Congrats! Your lik is updated!', color: 'success' })
}

const deleteLink = async (id: number) => {
	await linkStore.deleteLink(id)
	toast.add({ title: 'Congrats!', description: 'You delete your link!', color: 'error' })
}

// Rozwijanie szczegółów:
const expandedId = ref<number | null>(null)
const editStatus = ref('new')
const editNote = ref('')
const editDate = ref('')
const editAdditionalLinks = ref<{ url: string; description: string }[]>([])

const statusOptions = [
	{ label: 'New', value: 'new' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Claimed', value: 'claimed' },
]

function getBgClass(link: any) {
	if (link.type === 'airdrop') {
		switch (link.status) {
			case 'new':
				return 'bg-blue-900/40 border-blue-700/30'
			case 'pending':
				return 'bg-emerald-900/40 border-emerald-700/30'
			case 'claimed':
				return 'bg-orange-900/40 border-orange-600/30'
			default:
				return 'bg-white/5 border-white/10'
		}
	} else {
		return 'bg-white/5 border-white/10'
	}
}

function formatDate(dateString: string) {
	if (!dateString) return ''
	const date: Date = new Date(dateString)
	return date.toLocaleDateString('pl-PL')
}

function formatUrl(url: string): string {
	if (!/^https?:\/\//i.test(url)) return 'https://' + url
	return url
}

function toggleExpand(link: any) {
	if (expandedId.value === link.id) {
		expandedId.value = null
	} else {
		expandedId.value = link.id
		editStatus.value = link.status || 'new'
		editNote.value = link.note || ''
		editDate.value = link.date ? String(link.date).slice(0, 10) : ''
		editAdditionalLinks.value = Array.isArray(link.additional_links)
			? link.additional_links.map((a: any) => ({ ...a }))
			: []
	}
}

function addAdditionalLink() {
	editAdditionalLinks.value.push({ url: '', description: '' })
}
function removeAdditionalLink(idx: number) {
	editAdditionalLinks.value.splice(idx, 1)
}

async function saveDetails(link: any) {
	const data: any = { ...link }
	if (link.type === 'airdrop') {
		data.status = editStatus.value
		data.note = editNote.value
		data.date = editDate.value
		data.additional_links = [...editAdditionalLinks.value]
	} else {
		data.note = editNote.value
		data.additional_links = [...editAdditionalLinks.value]
	}
	await linkStore.updateLink(link.id, data)
	expandedId.value = null
	toast.add({ title: 'Details saved', color: 'success' })
}

function resetDetails(link: any) {
	expandedId.value = null
}

const startEdit = (link: any) => {
	editingId.value = link.id
	title.value = link.title
	url.value = link.url
	type.value = link.type || 'strona'
}

const cancelEdit = () => {
	editingId.value = null
	title.value = ''
	url.value = ''
	type.value = 'strona'
}

const sortedLinks = computed(() => {
	let list = [...linkStore.links]
	if (filterType.value !== 'all') {
		list = list.filter(link => link.type === filterType.value)
	}
	switch (sortBy.value) {
		case 'name-asc':
			list.sort((a, b) => a.title.localeCompare(b.title))
			break
		case 'name-desc':
			list.sort((a, b) => b.title.localeCompare(a.title))
			break
		case 'type-asc':
			list.sort((a, b) => a.type.localeCompare(b.type))
			break
		case 'type-desc':
			list.sort((a, b) => b.type.localeCompare(a.type))
			break
		case 'date-asc':
			list.sort((a, b) => a.id - b.id)
			break
		case 'date-desc':
			list.sort((a, b) => b.id - a.id)
			break
	}
	return list
})
</script>
